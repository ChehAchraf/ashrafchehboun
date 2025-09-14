import Icon from "../utils/icon.util";
import paginationStyles from "../../styles/blocks/pagination.module.scss";

/**
 * Pagination Block
 * Displays pagination controls for blog posts
 * 
 * @param {Object} props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Function to handle page changes
 * @returns {jsx} <PaginationBlock />
 */
export default function PaginationBlock({ currentPage, totalPages, onPageChange }) {
	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;
		
		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			const startPage = Math.max(1, currentPage - 2);
			const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
			
			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}
		}
		
		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<div className={paginationStyles.pagination}>
			<button
				className={`${paginationStyles.pageButton} ${paginationStyles.navButton}`}
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<Icon icon={['fas', 'chevron-left']} />
				Previous
			</button>

			<div className={paginationStyles.pageNumbers}>
				{pageNumbers.map((page) => (
					<button
						key={page}
						className={`${paginationStyles.pageButton} ${
							page === currentPage ? paginationStyles.active : ''
						}`}
						onClick={() => onPageChange(page)}
					>
						{page}
					</button>
				))}
			</div>

			<button
				className={`${paginationStyles.pageButton} ${paginationStyles.navButton}`}
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
				<Icon icon={['fas', 'chevron-right']} />
			</button>
		</div>
	);
}
