import React, { useEffect, useState } from 'react';
import { Alert, Pressable, View, Text, Modal } from 'react-native';
import axios from 'axios';

import GoRESTPost from './GoRESTPost'
import Service from "../Services/GoRESTService";
import styles from '../Styles'

//^ Connecting to API Requiring Bearer Access_Token

const GoREST = () => {
  const [data1, setData1] = useState<any[]>([]);

  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hide, setHidden] = useState<{[key:string]:boolean}>();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [postText,setPostText] = useState<{[key:string]:{title: string, text:string}}>();

  //*Implementation in TypeScript of Multi-Object State with Variable Key (Defined upon retrieval)
  //*Able to access child of object and selectively modify values of specific or specific key-value pair

  //& submit post fields data to create new post
  const handleClick = (userId:number) => {
    // console.log(postText)

    const post = postText![userId]
    
    Service.processData(post, userId.toString()).then((result)=> {
      // console.log(result.data);

      setIsError(false);
      setMessage(result.data.message);
      setModalVisible(true);
      
      setPostText((prevState)=>({
        ...prevState,
        [userId]:{
          title: "",
          text: ""
        }
      }))
      
     
    }).catch (err => {
      setIsError(true);
      setMessage(err.response.data.message);
      console.log(err.response.data.message)
      setModalVisible(true);
    });
    
  };
  
  //&toggles changes in title field of specific post form
  const handleChangeTitle = (userId:number, title:string) => {
    setPostText((prevState)=>({
      ...prevState,
      [userId]:{
        title: title,
        text: postText![userId].text
      }
    }))
  }

  //&toggles changes in text field of specific post form
  const handleChangeText = (userId:number, text:string) => {
    setPostText((prevState)=>({
      ...prevState,
      [userId]:{
        title:postText![userId].title,
        text: text
      }
    }))
  }
  

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `;
    return status + message;
  }

  //& toggle viewing posts under selected user
  const viewPost = (userId:any) => {
    if (!hide![userId]) {
      setHidden((prevState)=>({
        ...prevState,
        [userId]:true
      }))
    } else {
      setHidden((prevState)=>({
        ...prevState,
        [userId]:false
      }))

    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://gorest.co.in/public/v2/users', {
        headers: {
          'Authorization': 'Bearer 89636d5571bbfac4e947e63c80c31097fff66d149e57a61658d5cbcf958d8d53'
        }
      })
        // console.log(response.data)
        
        setData1(response.data)
        setHasLoaded(true);
        const result = response.data;

        result.forEach((res:any)=> {
          const user = res.id.toString();
          setPostText((prevState)=>({
            ...prevState,
            [user]:{
              title:"",
              text:""
            }
          }))
          setHidden ((prevState)=>({
            ...prevState,
            [user]:true
          }))
        })
             
    }
    fetchData();
  }, []);

  return (
      hasLoaded ? 
      <div className="bg-gradient-to-br from-zinc-200 from-10% via-sky-400 via-50% to-white to-80%">
        {/* <button onClick={e=>console.log(postText)}>Test</button> */}
        <div className="text-center font-bold p-4">GoREST API with Bearer Access_Token</div>
        {data1.map((item:any) => {
          return(<div key={item.id} className="m-2 p-4 bg-gradient-to-tl from-zinc-200 from-10% via-lime-400 via-50% to-white to-80% rounded-lg drop-shadow-md">

            <div className="text-purple-700 m-2">
              User Name: {item.name}
            </div>

            <div className="flex flex-row justify-center gap-x-4 border-4 border-rose-600 rounded-lg py-4">

              <div className="basis-1/2 flex flex-col gap-y-4">

                <input className='border border-gray-200 p-2 w-full rounded duration-700 ease-in-out'
                  name="postTitle" id="postTitle" onChange={e => handleChangeTitle(item.id, e.target.value)}
                  value={postText![item.id].title}
                  placeholder="Enter your post title here"
                  required/>

                <textarea className='border border-gray-200 p-2 w-full rounded duration-700 ease-in-out'
                  name="postText" id="postText" onChange={e => handleChangeText(item.id, e.target.value)}
                  value={postText![item.id].text}
                  placeholder="Enter your message here"
                  required/>

              </div>
            
              <button type='button' className="basis-1/4 m-2 p-4 hover:scale-100 scale-90 text-xl
                                            rounded-md bg-zinc-100 hover:bg-white duration-700 ease-in-out" 
                                onClick={e => handleClick(item.id)}>
                                  Post
              </button>      

            </div>
            <div className=" flex flex-row justify-center">
              <div className="text-purple-700 flex items-center">View Posts by {item.name} --</div>
              <button type='button'  className="m-6 p-4 hover:scale-110 rounded-md bg-zinc-100 
                                    hover:bg-white duration-700 ease-in-out border-black border" 
                                    onClick={e => viewPost(item.id)}>
                                      View
              </button>
            </div>
            

          {hide![item.id]?
          <div/> 
          : <GoRESTPost userId={item.id} /> }
          
          </div>)
                  
        })}

      
      <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <Text>Close</Text>
                            </Pressable>
                        </View>
                        </View>
                </Modal>
    </div>
    : <div className="p-10 flex flex-row font-semibold text-xl items-center"> 
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading Page
      </div>
  );
}
export default GoREST