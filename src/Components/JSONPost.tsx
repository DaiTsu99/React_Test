import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Paginate from '../Paginate';

const JSONPost = () => {
   const [posts, setPosts] = useState<any[]>([])
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [postsPerPage] = useState<number>(3);

   

    const client = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com/posts" 
    });

    useEffect(() => {
        const fetchPost = async () => {
            let response = await client.get('?_limit=10');
            setPosts(response.data);
            console.log(response.data);
         };
         fetchPost();
     }, []);

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      
      const paginate = (pageNumber:number) => {
         setCurrentPage(pageNumber);
      };

     return (
      <div>
        <div className="posts-container flex flex-col mx-10">
         {currentPosts.map((post) => {
            return (
               <div className="mt-10 border-b-2 border-black bg-blue-200" key={post.id}>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="post-body">{post.body}</p>
                  <div className="flex justify-end">
                  <div className="bg-red-200 w-fit p-4 hover:bg-red-400 rounded cursor-pointer">Dummy Button</div>
                  </div>
               </div>
            );
         })}
         </div>
         <Paginate
                  postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                  paginate={paginate}
               />
      </div>
         
     );
}
export default JSONPost

