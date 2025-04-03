import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalResults,
  className = '' 
}) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  // Calculate which page numbers to show (first, last, current, and neighbors)
  const getVisiblePageNumbers = () => {
    const pages = [];
    
    // Always include first page
    pages.push(1);
    
    // Calculate range around current page (current-1, current, current+1)
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis if there's a gap after the first page
    if (rangeStart > 2) {
      pages.push('...');
    }
    
    // Add pages in the calculated range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if there's a gap before the last page
    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    }
    
    // Always include last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const visiblePages = getVisiblePageNumbers();
  
  const handlePageClick = (page) => {
    // Only navigate if it's a valid page number (not ellipsis)
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className={`mt-8 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Results info */}
        <div className="text-sm text-gray-600">
          <span>Showing {Math.min(totalResults, (currentPage - 1) * 10 + 1)}-{Math.min(currentPage * 10, totalResults)} of {totalResults} results</span>
        </div>
        
        {/* Pagination controls */}
        <div className="flex items-center space-x-1">
          {/* Previous button */}
          <button
            onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          {/* Page numbers */}
          {visiblePages.map((page, index) => (
            <button
              key={`${page}-${index}`}
              onClick={() => handlePageClick(page)}
              className={`w-8 h-8 rounded-md ${
                page === currentPage 
                  ? 'bg-tazama-yellow text-tazama-blue font-bold' 
                  : page === '...' 
                    ? 'bg-transparent text-gray-600 cursor-default' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          
          {/* Next button */}
          <button
            onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;