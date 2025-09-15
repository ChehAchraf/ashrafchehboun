// Core packages
import Link from "next/link";
import Icon from "../../utils/icon.util";

// Section structure
import Section from "../../structure/section";
import Container from "../../structure/container";

// Section general blocks
import SectionTitle from "../../blocks/section.title.block";

// Section specific blocks
import BlogPostBlock from "../../blocks/blog.post.block";

// Section scss
import about from "../../../styles/sections/index/about.module.scss";
import blogStyles from "../../../styles/sections/index/blog.module.scss";

/**
 * Section: Blog
 * Display recent blog posts to showcase writing and expertise
 *
 * @param {Object} props
 * @param {Array} props.posts - Array of blog posts from Medium
 * @returns {jsx} <Blog />
 */
export default function Blog({ posts = [] }) {
	// Get featured posts (limit to 3)
	const featuredPosts = posts.filter(post => post.featured).slice(0, 3);

	return (
		<Section classProp={`${about.section} borderBottom`}>
			<Container spacing={["verticalXXXLrg"]}>
				<SectionTitle
					title="Recent Blog Posts"
					preTitle="Thoughts & Insights"
					subTitle="Sharing my knowledge and experiences in web development, backend architecture, and technology trends."
				/>
				<section className={blogStyles.blogGrid}>
					{featuredPosts.map((post) => (
						<BlogPostBlock key={post.id} post={post} />
					))}
				</section>
				<div className={blogStyles.blogFooter}>
					<Link href="/blog" className={blogStyles.viewAllLink}>
						View All Posts
						<Icon icon={['fas', 'arrow-right']} />
					</Link>
				</div>
			</Container>
		</Section>
	);
}
