export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { number } = req.query;
    if (!number) {
        return res.status(400).json({ error: 'Missing number parameter' });
    }

    const targetUrl = `https://fam-official.serv00.net/api/database.php?number=${encodeURIComponent(number)}`;

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Target API error' });
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
