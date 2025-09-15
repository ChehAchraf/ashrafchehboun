/**
 * Medium API Utility
 * Fetches blog posts from Medium RSS feed
 */

/**
 * Fetch Medium posts from RSS feed
 * @param {string} username - Medium username
 * @param {number} limit - Number of posts to fetch (default: 10)
 * @returns {Promise<Array>} Array of blog posts
 */
export async function fetchMediumPosts(username, limit = 10) {
	// Try multiple RSS endpoints
	const rssUrls = [
		`https://medium.com/feed/@ashrafchehboun`,
		`https://medium.com/@ashrafchehboun/feed`,
		`https://ashrafchehboun.medium.com/feed`
	];
	
	for (const rssUrl of rssUrls) {
		try {
			console.log('Trying RSS URL:', rssUrl);
			
			// Use a CORS proxy to fetch the RSS feed
			const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
			
			console.log('Fetching Medium posts from:' , proxyUrl);
			
			const response = await fetch(proxyUrl, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
				},
			});
			
			if (!response.ok) {
				console.warn(`HTTP error for ${rssUrl}: ${response.status}`);
				continue;
			}
			
			const data = await response.json();
			
			console.log('Medium API Response Status:', data.status);
			console.log('Medium API Items Count:', data.items ? data.items.length : 0);
			
			if (data.status !== 'ok') {
				console.warn(`RSS feed parsing failed for ${rssUrl}:`, data);
				continue;
			}
			
			if (!data.items || data.items.length === 0) {
				console.warn(`No items found in RSS feed: ${rssUrl}`);
				continue;
			}
			
			// If we get here, we have items, so process them
			console.log('Successfully found items in:', rssUrl);
			
			// Transform RSS data to our blog post format
			const posts = data.items.slice(0, limit).map((item, index) => {
				// Extract content from description or content:encoded
				const description = item.description || item['content:encoded'] || item.content || '';
				
				// Remove HTML tags and get excerpt
				const excerpt = description
					.replace(/<[^>]*>/g, '')
					.replace(/&[^;]+;/g, ' ')
					.replace(/\s+/g, ' ')
					.trim()
					.substring(0, 200) + '...';
				
				// Extract tags from categories
				const tags = item.categories || [];
				
				// Determine category based on tags or content
				const category = determineCategory(tags, item.title);
				
				// Calculate reading time (rough estimate)
				const wordCount = description.replace(/<[^>]*>/g, '').split(' ').length;
				const readTime = Math.max(1, Math.ceil(wordCount / 200)); // Average 200 words per minute, minimum 1 min
				
				// Create slug from title
				const slug = item.title
					.toLowerCase()
					.replace(/[^a-z0-9\s-]/g, '')
					.replace(/\s+/g, '-')
					.replace(/-+/g, '-')
					.trim('-');
				
				return {
					id: index + 1,
					title: item.title,
					excerpt: excerpt,
					date: item.pubDate,
					readTime: `${readTime} min read`,
					category: category,
					tags: tags.slice(0, 5), // Limit to 5 tags
					featured: index < 2, // First 2 posts are featured
					slug: slug,
					url: item.link,
					mediumUrl: item.link,
					author: item.author || item['dc:creator'] || 'Achraf Chehboun',
					thumbnail: item.thumbnail || null
				};
			});
			
			console.log('Transformed posts:', posts);
			return posts;
			
		} catch (error) {
			console.warn(`Error with RSS URL ${rssUrl}:`, error.message);
			continue;
		}
	}
	
	// If we get here, none of the RSS URLs worked
	console.warn('All RSS URLs failed, returning your actual Medium article as fallback');
	return [
		{
			id: 1,
			title: "10 Lessons I Learned from My First Laravel Project",
			excerpt: "When I started my very first Laravel project, I had no idea what I was getting myself into. I thought it would be just another PHP framework, but it turned out to be much more. From excitement to frustration, I went through every emotion while trying to build something that actually worked.",
			date: "2025-09-14T14:26:36.000Z",
			readTime: "3 min read",
			category: "Backend Development",
			tags: ["laravel-framework", "laravel", "coding"],
			featured: true,
			slug: "10-lessons-i-learned-from-my-first-laravel-project",
			url: "/blog/10-lessons-i-learned-from-my-first-laravel-project",
			mediumUrl: "https://medium.com/@ashrafchehboun/10-lessons-i-learned-from-my-first-laravel-project-729a35e143b4",
			author: "sha9orono"
		}
	];
}

/**
 * Determine category based on tags and title
 * @param {Array} tags - Array of tags
 * @param {string} title - Post title
 * @returns {string} Category name
 */
function determineCategory(tags, title) {
	const titleLower = title.toLowerCase();
	const tagsLower = tags.map(tag => tag.toLowerCase());
	
	// Backend Development
	if (tagsLower.some(tag => ['backend', 'api', 'server', 'laravel', 'php', 'python', 'django', 'flask', 'nodejs', 'express'].includes(tag)) ||
		titleLower.includes('api') || titleLower.includes('backend') || titleLower.includes('server')) {
		return 'Backend Development';
	}
	
	// Frontend Development
	if (tagsLower.some(tag => ['frontend', 'react', 'vue', 'angular', 'javascript', 'css', 'html', 'ui', 'ux'].includes(tag)) ||
		titleLower.includes('frontend') || titleLower.includes('react') || titleLower.includes('vue')) {
		return 'Frontend Development';
	}
	
	// Database
	if (tagsLower.some(tag => ['database', 'mysql', 'postgresql', 'mongodb', 'sql', 'nosql'].includes(tag)) ||
		titleLower.includes('database') || titleLower.includes('sql')) {
		return 'Database';
	}
	
	// DevOps
	if (tagsLower.some(tag => ['devops', 'docker', 'kubernetes', 'ci/cd', 'deployment', 'aws', 'azure', 'git'].includes(tag)) ||
		titleLower.includes('devops') || titleLower.includes('docker') || titleLower.includes('deployment')) {
		return 'DevOps';
	}
	
	// Security
	if (tagsLower.some(tag => ['security', 'authentication', 'authorization', 'encryption', 'cybersecurity'].includes(tag)) ||
		titleLower.includes('security') || titleLower.includes('auth')) {
		return 'Security';
	}
	
	// Default category
	return 'Web Development';
}

