import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const JSONPostComment = ({post}:{post:any}) => {
    
    const [hide,setHide] = useState<boolean>(true)
    const [comments, setComments] = useState<any[]>([]);

    const client = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com/" 
    });

    useEffect(() => {
        const fetchComment = async () => {
            let condition2 = 'posts/'+ post.id +'/comments?_limit=10';

            let response2 = await client.get(condition2);
            
            // console.log(response2.data);
            setComments(response2.data);
            
            // console.log(response.data);
         };
         fetchComment();
     }, []);

    return(
        <div>
                <div className="mt-4 p-4 border-b-2 border-black bg-blue-200" key={post.id}>
                     <div className="flex justify-end">
                        <button className="bg-red-200 w-fit p-4 hover:bg-red-400 rounded" onClick={e =>setHide(!hide)}>View Comment</button>
                     </div>
                     {hide ? <div/> : (
                        <div className="leading-6 flex justify-center items-center">
                        <div className="h-fit bg-green-800 drop-shadow-md rounded-xl p-2">
                        {comments.map((comment) => {
                            return (
                            <div className="mt-4 p-4 border-b-2 border-black bg-blue-200" key={comment.id}>
                                <h2 className="text-lg font-semibold">{comment.name}</h2>
                                <div className="text-sm italic">{comment.email}</div>
                                <div className="text-md">{comment.body}</div>
                            </div>
                            );
                        })}


                        </div>
                        </div>
                    )}  
                </div>
                
            
        </div>
        
    
)}

export default JSONPostComment;