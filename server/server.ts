import express, { Request, Response }  from 'express'
import axios from 'axios';
import cors from 'cors'

import sequelize from './database' ;
import Post from './models/Post';
import Raspberry from './models/Raspberry'

import * as AWSDynamo from './aws'
import * as GoRESTcontroller from './controllers/goREST.controller'

const app = express()

app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json({limit: '50mb'}));


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

app.post('/cloneDynamo', async (req:Request, res:Response)=> {
  try{
    console.log(req.body.raspData[0]);

    const raspData = req.body.raspData;

    raspData.forEach(async (raspberry:any)=> {
      const rasp = JSON.parse(raspberry)
      console.log(rasp.timestamp)
      await Raspberry.findOrCreate({
        where: { timestamp: rasp.timestamp },
        defaults: { 
          client_id: rasp.client_id,
          timestamp: rasp.timestamp,
          payload:rasp.payload
         },
      })
    })

    res.status(200).json({message:"success"})
  } catch (error:any) {

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

app.get('/getDynamoClone', (req: Request, res: Response) => {
    
  Raspberry.findAll({
      attributes: ['client_id','timestamp', 'payload']
    })
  .then(dbRasp => {
      const arrRasp = JSON.parse(JSON.stringify(dbRasp))
      let arrReturn:any[] = []

      arrRasp.forEach((arr:any)=> {
        // console.log(JSON.parse(arr.payload))
        arrReturn.push({
          client_id: arr.client_id,
          timestamp: arr.timestamp,
          payload: JSON.parse(arr.payload)
        })
      })
      const arrFinal = arrReturn.sort(function(a:any, b:any) { return a.timestamp - b.timestamp })

      res.status(200).send({iot:arrFinal})
  })
  .catch(err => {
      console.log('error', err);
  });
});

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

//& update selected post in database
app.post('/updatePost', async (req: Request, res: Response) => {
  try{
    console.log(req.body)
    let id = req.body.id;
    let message = req.body.text;
  
    const updatedPost = await Post.update(
      { message:message }, // Fields to update
      { where: { id:id } } // Condition for the update
    );

  res.status(201).json({
    status: "success",
    message:"successfully updated",
    data: {
      updatedPost,
    },
  });

  }  catch(err) {
      console.log('error', err);
      res.status(500).json({ error: err|| 'Internal server error' });
  };
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