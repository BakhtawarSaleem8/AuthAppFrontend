import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5; // Number of visible pages before showing '...'
console.log(totalPages , "total pages")
    if (totalPages <= maxPagesToShow + 2) {
      // Show all pages if total pages are small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Show ellipsis if currentPage > 3
      if (currentPage > 3) {
        pages.push("...");
      }

      // Show 2 pages before & after current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Show ellipsis if there are more pages after
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }
console.log(pages , "pages")
    return pages;
  };

  return (
    <div className="flex items-center space-x-2 mt-4 w-fit m-auto">
      {/* Previous Button */}
      <button
        className={`px-3 py-1 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-800 hover:bg-gray-200"}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Page Numbers */}
      {generatePageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`px-3 py-1 rounded-lg ${currentPage === page ? "bg-blue-500 text-white hover:bg-blue-800" : "text-gray-800 hover:bg-gray-200"}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1 text-gray-500">
            {page}
          </span>
        )
      )}

      {/* Next Button */}
      <button
        className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-800 hover:bg-gray-200"}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
