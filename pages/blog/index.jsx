// Sections
import AllBlogPosts from '../../components/sections/blog/all'

import Color  from '../../components/utils/page.colors.util'

import colors from '../../content/blog/_colors.json'
import settings from '../../content/_settings.json'
import { fetchMediumPosts } from '../../components/utils/medium.api.util'

//
export default function Blog({ posts }) {
	return (
		<>
		<Color colors={colors} />
		<AllBlogPosts posts={posts} />
		</>
	)
}

// This gets called on every request
export async function getServerSideProps({ res }) {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=3600, stale-while-revalidate=300'
	)

	try {
		// Fetch posts from Medium
		const posts = await fetchMediumPosts(settings.username.medium, 20);
		
		return {
			props: {
				posts: posts || []
			}
		}
	} catch (error) {
		console.error('Error fetching Medium posts:', error);
		
		// Return empty array if Medium API fails
		return {
			props: {
				posts: []
			}
		}
	}
}
