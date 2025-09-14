import Icon from "../utils/icon.util";
import blogStyles from "../../styles/blocks/blog.post.module.scss";

/**
 * Blog Post Block
 * Displays individual blog post with title, excerpt, date, and metadata
 * 
 * @param {Object} props
 * @param {Object} props.post - Blog post data
 * @param {string} props.post.title - Post title
 * @param {string} props.post.excerpt - Post excerpt
 * @param {string} props.post.date - Publication date
 * @param {string} props.post.readTime - Estimated reading time
 * @param {string} props.post.category - Post category
 * @param {Array} props.post.tags - Post tags
 * @param {boolean} props.post.featured - Whether post is featured
 * @param {string} props.post.url - Post URL
 * @returns {jsx} <BlogPostBlock />
 */
export default function BlogPostBlock({ post }) {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	};

	return (
		<article className={blogStyles.blogPost}>
			<div className={blogStyles.blogPostHeader}>
				{post.featured && (
					<span className={blogStyles.featuredBadge}>
						<Icon icon={['fas', 'star']} />
						Featured
					</span>
				)}
				<span className={blogStyles.categoryBadge}>{post.category}</span>
			</div>
			
			<div className={blogStyles.blogPostContent}>
				<h3 className={blogStyles.blogPostTitle}>{post.title}</h3>
				<p className={blogStyles.blogPostExcerpt}>{post.excerpt}</p>
				
				<div className={blogStyles.blogPostMeta}>
					<div className={blogStyles.metaItem}>
						<Icon icon={['fas', 'calendar']} />
						<span>{formatDate(post.date)}</span>
					</div>
					<div className={blogStyles.metaItem}>
						<Icon icon={['fas', 'clock']} />
						<span>{post.readTime}</span>
					</div>
				</div>
				
				<div className={blogStyles.blogPostTags}>
					{post.tags.map((tag, index) => (
						<span key={index} className={blogStyles.tag}>{tag}</span>
					))}
				</div>
				
				<a 
					href={post.mediumUrl || post.url || `/blog/${post.slug || `article-${post.id}`}`} 
					className={blogStyles.readMoreLink}
					target={post.mediumUrl ? "_blank" : "_self"}
					rel={post.mediumUrl ? "noopener noreferrer" : ""}
				>
					Read More
					<Icon icon={['fas', 'arrow-right']} />
				</a>
			</div>
		</article>
	);
}
