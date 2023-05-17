import express, { Request, Response }  from 'express'
import axios from 'axios';
import cors from 'cors'

import sequelize from './database' ;

import Post from './models/Post';

import * as AWSDynamo from './aws'
import * as GoRESTcontroller from './controllers/goREST.controller'

const app = express()

app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json())

sequelize.sync();

app.get("/getDynamo", AWSDynamo.getData)
app.post("/getFilteredTimeDynamoFrom", AWSDynamo.getFilteredDataByTimeFrom)
app.post("/getFilteredTimeDynamoTo", AWSDynamo.getFilteredDataByTimeTo)
app.post("/getFilteredTimeDynamoFromAndTo", AWSDynamo.getFilteredDataByTimeFromAndTo)
app.post("/processData", GoRESTcontroller.processData);
app.post("/retrieveRESTPost",GoRESTcontroller.retrieveRESTPost);
app.post("/deleteRESTPost", GoRESTcontroller.deleteRESTPost);
app.post("/retrieveSingleRESTPost", GoRESTcontroller.retrieveSingleRESTPost);
app.post("/updateRESTPost", GoRESTcontroller.updateRESTPost);

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