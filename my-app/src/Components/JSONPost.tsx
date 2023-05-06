import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Paginate from '../Paginate';
import Comment from './JSONPostComment';

//^ Connecting To API and request data from API

const JSONPost = () => {
   const [posts, setPosts] = useState<any[]>([]);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [postsPerPage] = useState<number>(3);
   const [users, setUserList] = useState<any[]>([]);

   const filterGo = async (id:any) => {
      // let filterClient = axios.create({
      //    baseURL: "https://jsonplaceholder.typicode.com/posts?userId="+ id
      // })

      let condition = 'posts?_limit=10' + '&userId=' + id.value;

      let filteredClient = await client.get(condition);

      setPosts(filteredClient.data);
   }

    const client = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com/" 
    });

    useEffect(() => {
        const fetchPost = async () => {
         
            let response = await client.get('posts?_limit=10');
            let response2 = await client.get('users')
            setUserList(response2.data);
            // console.log(response2.data);
            setPosts(response.data);
            
            // console.log(response.data);
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
            <div className="flex flex-row gap-x-2 m-4 bg-teal-300 p-4">
               <div>Filter Posts by User Id: </div>
               <select value="DEFAULT" onChange={e => filterGo(e.target)}>
                  <option value="DEFAULT" disabled>Please choose one</option>
                  {users.map((user)=> {
                     return(
                        <option key={user.id}>{user.id}</option>
                     )
                  })}
               </select>
            </div>
            {currentPosts.map((post) => {
               return (
                  <div className="mt-10 p-4 border-b-2 border-black bg-blue-200" key={post.id}>
                     <h2 className="text-xl font-semibold">{post.title}</h2>
                     <div className="p-4 italic">UserId: {post.userId}</div>
                     <p className="post-body">{post.body}</p>
                     <div className="flex justify-end">
                        {/* <div className="bg-red-200 w-fit p-4 hover:bg-red-400 rounded cursor-pointer">Dummy Button</div> */}
                        <Comment post={post}/>
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

