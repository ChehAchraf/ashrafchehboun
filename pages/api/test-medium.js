// Test API endpoint to debug Medium integration
export default async function handler(req, res) {
	try {
		const rssUrl = `https://medium.com/feed/@ashrafchehboun`;
		const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
		
		console.log('Fetching from:', proxyUrl);
		
		const response = await fetch(proxyUrl);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data = await response.json();
		
		console.log('Raw API Response:', JSON.stringify(data, null, 2));
		
		return res.status(200).json({
			success: true,
			data: data,
			itemsCount: data.items ? data.items.length : 0
		});
		
	} catch (error) {
		console.error('Error in test-medium API:', error);
		return res.status(500).json({
			success: false,
			error: error.message
		});
	}
}
