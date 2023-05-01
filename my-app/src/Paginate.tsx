import React from 'react';

const Paginate = ({ postsPerPage, totalPosts, paginate }: {postsPerPage:number, totalPosts:number, paginate:any}) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
       pageNumbers.push(i);
    }
   //  console.log(pageNumbers)
  
    return (
       <div className="pagination-container mt-10">
          <div className="pagination flex flex-row justify-center gap-x-2">
             {pageNumbers.map((number) => (
                <button
                  type="button"
                   key={number}
                   onClick={() => paginate(number)}
                   className="page-number p-2 border-2 border-black rounded"
                   title={"Page " + number}
                >
                   {number}
                </button>
             ))}
          </div>
       </div>
    );
 };
  
 export default Paginate;