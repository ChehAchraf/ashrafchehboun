// Core packages
import { useState, useMemo } from "react";
import Icon from "../../utils/icon.util";

// Section structure
import Section from "../../structure/section";
import Container from "../../structure/container";

// Section general blocks
import SectionTitle from "../../blocks/section.title.block";

// Section specific blocks
import BlogPostBlock from "../../blocks/blog.post.block";
import BlogFilterBlock from "../../blocks/blog.filter.block";
import PaginationBlock from "../../blocks/pagination.block";

// Section scss
import about from "../../../styles/sections/index/about.module.scss";
import blogStyles from "../../../styles/sections/blog/all.module.scss";

/**
 * Section: All Blog Posts
 * Display all blog posts with filtering and pagination
 *
 * @param {Object} props
 * @param {Array} props.posts - Array of blog posts from Medium
 * @returns {jsx} <AllBlogPosts />
 */
export default function AllBlogPosts({ posts = [] }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedTags, setSelectedTags] = useState([]);
	const postsPerPage = 6;

	// Get unique categories and tags
	const categories = useMemo(() => {
		const cats = [...new Set(posts.map(post => post.category))];
		return cats.sort();
	}, [posts]);

	const tags = useMemo(() => {
		const allTags = posts.flatMap(post => post.tags);
		const uniqueTags = [...new Set(allTags)];
		return uniqueTags.sort();
	}, [posts]);

	// Filter posts based on selected category and tags
	const filteredPosts = useMemo(() => {
		return posts.filter(post => {
			const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
			const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));
			return categoryMatch && tagMatch;
		});
	}, [posts, selectedCategory, selectedTags]);

	// Sort filtered posts by date (newest first)
	const sortedPosts = useMemo(() => {
		return [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
	}, [filteredPosts]);

	// Calculate pagination
	const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
	const startIndex = (currentPage - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const currentPosts = sortedPosts.slice(startIndex, endIndex);

	// Handle page change
	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// Handle category change
	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		setCurrentPage(1); // Reset to first page
	};

	// Handle tag toggle
	const handleTagToggle = (tag) => {
		setSelectedTags(prev => 
			prev.includes(tag) 
				? prev.filter(t => t !== tag)
				: [...prev, tag]
		);
		setCurrentPage(1); // Reset to first page
	};

	// Handle clear filters
	const handleClearFilters = () => {
		setSelectedCategory('all');
		setSelectedTags([]);
		setCurrentPage(1);
	};

	return (
		<Section classProp={`${about.section} borderBottom`}>
			<Container spacing={["verticalXXXLrg"]}>
				<SectionTitle
					title="Blog Posts"
					preTitle="All Articles"
					subTitle="Explore my thoughts on web development, backend architecture, and technology trends."
				/>
				
				<BlogFilterBlock
					categories={categories}
					tags={tags}
					selectedCategory={selectedCategory}
					selectedTags={selectedTags}
					onCategoryChange={handleCategoryChange}
					onTagToggle={handleTagToggle}
					onClearFilters={handleClearFilters}
				/>

				<div className={blogStyles.resultsInfo}>
					<p>
						Showing {currentPosts.length} of {sortedPosts.length} posts
						{selectedCategory !== 'all' && ` in "${selectedCategory}"`}
						{selectedTags.length > 0 && ` tagged with "${selectedTags.join(', ')}"`}
					</p>
				</div>

				<section className={blogStyles.blogGrid}>
					{currentPosts.map((post) => (
						<BlogPostBlock key={post.id} post={post} />
					))}
				</section>

				{totalPages > 1 && (
					<PaginationBlock
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				)}
			</Container>
		</Section>
	);
}
