import Icon from "../utils/icon.util";
import filterStyles from "../../styles/blocks/blog.filter.module.scss";

/**
 * Blog Filter Block
 * Displays filter controls for blog posts (category and tag filters)
 * 
 * @param {Object} props
 * @param {Array} props.categories - Available categories
 * @param {Array} props.tags - Available tags
 * @param {string} props.selectedCategory - Currently selected category
 * @param {Array} props.selectedTags - Currently selected tags
 * @param {Function} props.onCategoryChange - Function to handle category changes
 * @param {Function} props.onTagToggle - Function to handle tag toggle
 * @param {Function} props.onClearFilters - Function to clear all filters
 * @returns {jsx} <BlogFilterBlock />
 */
export default function BlogFilterBlock({ 
	categories, 
	tags, 
	selectedCategory, 
	selectedTags, 
	onCategoryChange, 
	onTagToggle, 
	onClearFilters 
}) {
	const hasActiveFilters = selectedCategory !== 'all' || selectedTags.length > 0;

	return (
		<div className={filterStyles.filterContainer}>
			<div className={filterStyles.filterSection}>
				<h3 className={filterStyles.filterTitle}>
					<Icon icon={['fas', 'filter']} />
					Filter by Category
				</h3>
				<div className={filterStyles.categoryFilters}>
					<button
						className={`${filterStyles.filterButton} ${
							selectedCategory === 'all' ? filterStyles.active : ''
						}`}
						onClick={() => onCategoryChange('all')}
					>
						All Categories
					</button>
					{categories.map((category) => (
						<button
							key={category}
							className={`${filterStyles.filterButton} ${
								selectedCategory === category ? filterStyles.active : ''
							}`}
							onClick={() => onCategoryChange(category)}
						>
							{category}
						</button>
					))}
				</div>
			</div>

			<div className={filterStyles.filterSection}>
				<h3 className={filterStyles.filterTitle}>
					<Icon icon={['fas', 'tags']} />
					Filter by Tags
				</h3>
				<div className={filterStyles.tagFilters}>
					{tags.map((tag) => (
						<button
							key={tag}
							className={`${filterStyles.tagButton} ${
								selectedTags.includes(tag) ? filterStyles.active : ''
							}`}
							onClick={() => onTagToggle(tag)}
						>
							{tag}
						</button>
					))}
				</div>
			</div>

			{hasActiveFilters && (
				<div className={filterStyles.clearFilters}>
					<button
						className={filterStyles.clearButton}
						onClick={onClearFilters}
					>
						<Icon icon={['fas', 'times']} />
						Clear All Filters
					</button>
				</div>
			)}
		</div>
	);
}
