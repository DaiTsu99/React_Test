import express, { Request, Response }  from 'express'
import axios from 'axios';
import cors from 'cors'


import sequelize from './database' ;

import Post from './models/Post';

const app = express()

app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json())

sequelize.sync();

//& create new post in database
app.post('/uploadPost', async (req: Request, res: Response) => {
    try {
        let message = req.body.postText;
        console.log (message)

        if (message == null || message == ""){
           res.status(500).json({
            status: "failed",
            message:"Post Message is empty or missing, please ensure to enter your message before posting",
          });
        } else {
          const post = await Post.create({
            message,
          });
      
          res.status(201).json({
            status: "success",
            message:"successfully added",
            data: {
              post,
            },
          });
        }
        
        // console.log (dressName);
        // console.log (price);
        
      } catch (error:any) {
        // if (error.name === "SequelizeUniqueConstraintError") {
        //   return res.status(409).json({
        //     status: "failed",
        //     message: "Post with that name already exists",
        //   });
        // }
    
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
});

//& retrieve all posts in database
app.get('/retrievePost', (req: Request, res: Response) => {
    
        Post.findAll({
            attributes: ['id','message']
          })
        .then(dbPost => {
            const postInfos = JSON.parse(JSON.stringify(dbPost));
            res.status(200).send(postInfos);
        })
        .catch(err => {
            console.log('error', err);
        });
});

//& delete selected post in database
app.post('/deletePost', async (req: Request, res: Response) => {
  try{
    console.log(req.body)
  
  const post = await Post.destroy({ where: { id: req.body.id } });

  res.status(201).json({
    status: "success",
    message:"successfully deleted",
    data: {
      post,
    },
  });

  }  catch(err) {
      console.log('error', err);
  };
});

//! The access token given may change so required to be aware of changes to access token, and be prepared for changes

//& create new post using GoREST API
app.post('/processData', async (req: Request, res: Response) => {
  try{
    // console.log(req.body)

    const userId = req.body.userId;
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
});

//& retrieve all posts under specific user using GoREST API
app.post('/retrieveRESTPost', async (req: Request, res: Response) => {
    
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
});

//& delete selected post in GoREST API
app.post('/deleteRESTPost', async (req: Request, res: Response) => {
  try{
    console.log(req.body)

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
});

//& simple message retrieval
app.get('/api/data', (req: Request, res: Response) => {
    const data = {
    message: 'Hello World'
    }
    // console.log(data.message)
    res.json(data)
    })



app.listen(3100, ()=> {
    console.log('Server is listening on port 3100')
})