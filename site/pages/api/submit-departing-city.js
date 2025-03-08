import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { token, departingCity } = req.body;

        if (!token || !departingCity) {
            return res.status(400).json({
                success: false,
                message: 'Token and departing city are required'
            });
        }

        // Find user by token
        const userRecords = await base('Signups').select({
            filterByFormula: `{token} = '${token}'`,
            maxRecords: 1
        }).firstPage();

        if (userRecords.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const userRecord = userRecords[0];

        // Update departingCity in Signups table
        await base('Signups').update([
            {
                id: userRecord.id,
                fields: {
                    departingCity: departingCity
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            message: "Departing city updated successfully!",
            record: userRecord // Optionally, you can return the updated user record
        });

    } catch (error) {
        console.error('Departing city update error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Error updating departing city',
            error: error.error || 'UNKNOWN_ERROR'
        });
    }}