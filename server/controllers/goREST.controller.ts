import express, { Request, Response }  from 'express'
import axios from 'axios';

//! The access token given may change so required to be aware of changes to access token, and be prepared for changes

//& create new post using GoREST API
const processData = async (req: Request, res: Response) => {
    try{
      // console.log(req.body)
  
      const userId = req.body!.userId;
      const postTitle = req.body!.postTitle;
      const postText = req.body!.postText;
  
      let error1 = false; //*boolean for title error
      let error2 = false; //*boolean for text error
      if((postTitle == null || postTitle == "") &&  (postText == null || postText == "")){ 
        //*if both title and text produce error
        error1=true;
        error2=true;
      } else if (postTitle == null || postTitle == ""){
        //*if only post title produce error
          error1=true;
      } else if (postText == null || postText == "") {
        //*if only post text produce error
          error2=true
      } else {
        //*if all OK
        const response = await axios.post('https://gorest.co.in/public/v2/users/'+ userId + '/posts', 
        {
          title: postTitle,
          body:postText
        },
        {
          headers: {
            'Authorization': 'Bearer 60d45330467d45351663c06a9d7f89409eb0a163b4a9982d376d50ee5ef9f3e9'
          },
          
        })
          // console.log(response.data)
          const result = response.data
    
  
        res.status(201).json({
          status: "success",
          message:"successfully posted",
          data: {
            result,
          },
        });
          }
      
      //* the error messages to be returned
      if(error1 && !error2) {
        res.status(500).json({
          status: "failed",
          message:"Post Title is empty or missing, please ensure to enter your post title before posting",
        });
      } else if (!error1 && error2) {
        res.status(500).json({
          status: "failed",
          message:"Post Text is empty or missing, please ensure to enter your post text before posting",
        });
      } else if (error1 && error2) {
        res.status(500).json({
          status: "failed",
          message:"Both fields are either empty or missing, please ensure to fill in all fields of the selected user before posting",
        });
      }
      
  
    }  catch(err) {
        console.log('error', err);
    };
  };
  
  //& retrieve all posts under specific user using GoREST API
const retrieveRESTPost = async (req: Request, res: Response) => {
      
    try{
      // console.log(req.body)
  
      const userId = req.body.userId;
      
      // console.log(userId);
      const response = await axios.get('https://gorest.co.in/public/v2/users/'+ userId + '/posts', 
        {
          headers: {
            'Authorization': 'Bearer 60d45330467d45351663c06a9d7f89409eb0a163b4a9982d376d50ee5ef9f3e9'
          },
          
        })
      // console.log(response.data)
    const posts = response.data
    
  
    res.status(201).json({
      status: "success",
      message:"successfully retrieved",
      posts,
    });
  
    }  catch(err) {
        console.log('error', err);
    };
  };
  
  //& delete selected post in GoREST API
const deleteRESTPost = async (req: Request, res: Response) => {
    try{
      // console.log(req.body)
  
      const userId = req.body.userId;
      const postId = req.body.id;
    
    const response = await axios.delete('https://gorest.co.in/public/v2/posts/' + postId , 
        {
          headers: {
            'Authorization': 'Bearer 60d45330467d45351663c06a9d7f89409eb0a163b4a9982d376d50ee5ef9f3e9'
          },
          
        })
  
    const postInfo = response.data
  
    res.status(201).json({
      status: "success",
      message:"successfully deleted",
      data: {
        postInfo,
      },
    });
  
    }  catch(err) {
        console.log('error', err);
    };
  };
  
  //& retrieve one post in GoREST API
const retrieveSingleRESTPost = async (req: Request, res: Response) => {
      
    try{
      // console.log(req.body)
  
      const postId = req.body.postId;
      
      // console.log(userId);
      const response = await axios.get('https://gorest.co.in/public/v2/posts/'+ postId, 
        {
          headers: {
            'Authorization': 'Bearer 60d45330467d45351663c06a9d7f89409eb0a163b4a9982d376d50ee5ef9f3e9'
          },
          
        })
      // console.log(response.data)
    const result =response.data;
    const posts = [];
    posts.push(result);
    
  
    res.status(201).json({
      status: "success",
      message:"successfully retrieved",
      posts,
    });
  
    }  catch(err) {
        console.log('error', err);
    };
  };
  
  //& update selected GoREST post
const updateRESTPost = async (req: Request, res: Response) => {
    try{
      console.log(req.body)
  
      const postId = req.body.id;
      const postTitle = req.body.postTitle;
      const postText = req.body.postText;
  
      let error1 = false; //*boolean for title error
      let error2 = false; //*boolean for text error
      if((postTitle == null || postTitle == "") &&  (postText == null || postText == "")){ 
        //*if both title and text produce error
        error1=true;
        error2=true;
      } else if (postTitle == null || postTitle == ""){
        //*if only post title produce error
          error1=true;
      } else if (postText == null || postText == "") {
        //*if only post text produce error
          error2=true
      } else {
        //*if all OK
        const response = await axios.patch('https://gorest.co.in/public/v2/posts/' + postId , 
        {
          title: postTitle,
          body:postText
        },
        {
          headers: {
            'Authorization': 'Bearer 60d45330467d45351663c06a9d7f89409eb0a163b4a9982d376d50ee5ef9f3e9'
          },
          
        })
          // console.log(response.data)
          const result = response.data
    
  
        res.status(201).json({
          status: "success",
          message:"successfully updated",
          data: {
            result,
          },
        });
          }
      
      //* the error messages to be returned
      if(error1 && !error2) {
        res.status(500).json({
          status: "failed",
          message:"Post Title is empty or missing, please ensure to enter your post title before posting",
        });
      } else if (!error1 && error2) {
        res.status(500).json({
          status: "failed",
          message:"Post Text is empty or missing, please ensure to enter your post text before posting",
        });
      } else if (error1 && error2) {
        res.status(500).json({
          status: "failed",
          message:"Both fields are either empty or missing, please ensure to fill in all fields of the selected user before posting",
        });
      }
  
    }  catch(err) {
        console.log('error', err);
    };
  };

  export {
    processData,
    retrieveRESTPost,
    deleteRESTPost,
    retrieveSingleRESTPost,
    updateRESTPost
  };