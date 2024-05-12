import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.map((page, index) => {
        return (
          <div key={index} className='border border-gray-400'>
            <button
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? 'bg-red-400 text-white font-bold px-4 py-2'
                  : 'text-black font-medium px-4 py-2'
              }
            >
              {page}
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Pagination;
