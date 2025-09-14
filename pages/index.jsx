import Hero 		from '../components/sections/index/hero'
import Looking 		from '../components/sections/index/looking'
import About 		from '../components/sections/index/about'
import Technical 	from '../components/sections/index/technical'
import Career 		from '../components/sections/index/career'
import Blog 		from '../components/sections/index/blog'
import FeaturedProjects	from '../components/sections/projects/featured'

import Color 		from '../components/utils/page.colors.util'

import colors 		from '../content/index/_colors.json'
import settings 	from '../content/_settings.json'
import { fetchMediumPosts } from '../components/utils/medium.api.util'

//
export default function HomePage({ blogPosts }) {

	return (
		<>
			<Color colors={colors} />
			<Hero />
			<Looking />
			<FeaturedProjects />
			<About />
			<Technical />
			<Career />
			<Blog posts={blogPosts} />
		</>
	);
}

// This gets called on every request
export async function getServerSideProps({ res }) {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=3600, stale-while-revalidate=300'
	)

	try {
		// Fetch recent posts from Medium for homepage
		const blogPosts = await fetchMediumPosts(settings.username.medium, 6);
		
		return {
			props: {
				blogPosts: blogPosts || []
			}
		}
	} catch (error) {
		console.error('Error fetching Medium posts for homepage:', error);
		
		// Return empty array if Medium API fails
		return {
			props: {
				blogPosts: []
			}
		}
	}
}