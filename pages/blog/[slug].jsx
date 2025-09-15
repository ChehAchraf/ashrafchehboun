// Core packages
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Section structure
import Section from '../../components/structure/section';
import Container from '../../components/structure/container';

// Section general blocks
import SectionTitle from '../../components/blocks/section.title.block';

// Section specific blocks
import BlogPostBlock from '../../components/blocks/blog.post.block';

// Utils
import Icon from '../../components/utils/icon.util';
import Color from '../../components/utils/page.colors.util';

// Section scss
import about from '../../styles/sections/index/about.module.scss';
import articleStyles from '../../styles/sections/blog/article.module.scss';

// Content
import colors from '../../content/blog/_colors.json';
import settings from '../../content/_settings.json';
import { fetchMediumPosts } from '../../components/utils/medium.api.util';

/**
 * Individual Blog Article Page
 * Displays a single blog article with full content
 *
 * @param {Object} props
 * @param {Object} props.article - The blog article data
 * @returns {jsx} <BlogArticle />
 */
export default function BlogArticle({ article }) {
	const router = useRouter();
	const [relatedPosts, setRelatedPosts] = useState([]);

	useEffect(() => {
		if (article) {
			// Get related posts (same category, excluding current post)
			// For now, we'll use a simple approach since we don't have all posts in this component
			// In a real implementation, you might want to pass all posts as props
			setRelatedPosts([]);
		}
	}, [article]);

	if (!article) {
		return (
			<>
				<Color colors={colors} />
				<Section classProp={`${about.section} borderBottom`}>
					<Container spacing={["verticalXXXLrg"]}>
						<div className={articleStyles.notFound}>
							<h1>Article Not Found</h1>
							<p>The article you&apos;re looking for doesn&apos;t exist.</p>
							<button 
								className={articleStyles.backButton}
								onClick={() => router.push('/blog')}
							>
								<Icon icon={['fas', 'arrow-left']} />
								Back to Blog
							</button>
						</div>
					</Container>
				</Section>
			</>
		);
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	};

	return (
		<>
			<Color colors={colors} />
			<Section classProp={`${about.section} borderBottom`}>
				<Container spacing={["verticalXXXLrg"]}>
					{/* Back to Blog Button */}
					<div className={articleStyles.navigation}>
						<button 
							className={articleStyles.backButton}
							onClick={() => router.push('/blog')}
						>
							<Icon icon={['fas', 'arrow-left']} />
							Back to Blog
						</button>
					</div>

					{/* Article Header */}
					<article className={articleStyles.article}>
						<header className={articleStyles.articleHeader}>
							<div className={articleStyles.articleMeta}>
								{article.featured && (
									<span className={articleStyles.featuredBadge}>
										<Icon icon={['fas', 'star']} />
										Featured
									</span>
								)}
								<span className={articleStyles.categoryBadge}>{article.category}</span>
							</div>
							
							<h1 className={articleStyles.articleTitle}>{article.title}</h1>
							
							<div className={articleStyles.articleInfo}>
								<div className={articleStyles.metaItem}>
									<Icon icon={['fas', 'calendar']} />
									<span>{formatDate(article.date)}</span>
								</div>
								<div className={articleStyles.metaItem}>
									<Icon icon={['fas', 'clock']} />
									<span>{article.readTime}</span>
								</div>
							</div>
						</header>

						{/* Article Content */}
						<div className={articleStyles.articleContent}>
							<div className={articleStyles.articleExcerpt}>
								<p>{article.excerpt}</p>
							</div>

							{/* Full Article Content - This would be expanded in a real implementation */}
							<div className={articleStyles.articleBody}>
								<h2>Introduction</h2>
								<p>
									This is where the full article content would go. In a real implementation, 
									you would either store the full content in your JSON file or fetch it from 
									a CMS or markdown files. For now, this is a placeholder to demonstrate 
									the article layout structure.
								</p>
								
								<h3>Key Points Covered</h3>
								<ul>
									<li>Detailed explanation of the topic</li>
									<li>Code examples and best practices</li>
									<li>Real-world applications</li>
									<li>Common pitfalls to avoid</li>
									<li>Additional resources and references</li>
								</ul>

								<h3>Conclusion</h3>
								<p>
									This article has covered the essential aspects of {article.title.toLowerCase()}. 
									By following these guidelines and best practices, you&apos;ll be able to implement 
									these concepts effectively in your own projects.
								</p>
							</div>

							{/* Article Tags */}
							<div className={articleStyles.articleTags}>
								<h4>Tags:</h4>
								<div className={articleStyles.tagList}>
									{article.tags.map((tag, index) => (
										<span key={index} className={articleStyles.tag}>{tag}</span>
									))}
								</div>
							</div>
						</div>
					</article>

					{/* Related Posts */}
					{relatedPosts.length > 0 && (
						<section className={articleStyles.relatedPosts}>
							<SectionTitle
								title="Related Articles"
								preTitle="You might also like"
								subTitle=""
							/>
							<div className={articleStyles.relatedGrid}>
								{relatedPosts.map((post) => (
									<BlogPostBlock key={post.id} post={post} />
								))}
							</div>
						</section>
					)}
				</Container>
			</Section>
		</>
	);
}

// This function gets called at build time
export async function getStaticPaths() {
	try {
		// Get all blog posts from Medium
		const posts = await fetchMediumPosts(settings.username.medium, 50);
		
		const paths = posts.map((post) => ({
			params: { slug: post.slug || `article-${post.id}` },
		}));

		return {
			paths,
			fallback: 'blocking', // Use blocking fallback for dynamic content
		};
	} catch (error) {
		console.error('Error generating static paths:', error);
		return {
			paths: [],
			fallback: 'blocking',
		};
	}
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	try {
		// Get all blog posts from Medium
		const posts = await fetchMediumPosts(settings.username.medium, 50);
		
		// Find the article by slug
		const article = posts.find(
			(post) => (post.slug || `article-${post.id}`) === params.slug
		);

		return {
			props: {
				article: article || null,
			},
			revalidate: 3600, // Revalidate every hour
		};
	} catch (error) {
		console.error('Error fetching article:', error);
		return {
			props: {
				article: null,
			},
			revalidate: 3600,
		};
	}
}
