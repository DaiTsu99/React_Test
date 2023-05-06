import React,{ useState, useEffect } from "react";
import { Alert, Pressable, View, Text, StyleSheet, Modal } from 'react-native';

import Service from "../Services/Service";

import ViewPosts from "./ViewPosts"
import styles from '../Styles'

//^ Using TypeScript to connect to Database

const HomePage = () => {

    const [text, setText] = useState<string>();
    const [hasLoaded, setHasLoaded] = useState(false);

    const [postText, setPostText] = useState<string>("");

    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const [hide, setHidden] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);

    const handleClick = () => {
      // console.log(postText)
      Service.postMessage(postText).then((result)=> {
        console.log(result.data);
  
        
        setIsError(false);
        setMessage(result.data.message);
        setModalVisible(true);
        setHidden(true)
        setPostText("");
       
      }).catch (err => {
        setIsError(true);
        setMessage(err.response.data.message);
        console.log(err.response.data.message)
        setModalVisible(true);
      });
      
    };

    const viewPost = () => {
      if (!hide) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      
    };

    useEffect(() => {
        Service.getString().then((result) => {
            console.log(result.data)
            
            setText(result.data.message);
            
            setHasLoaded(true);
        });
        
    }, []);  

    const getMessage = () => {
      const status = isError ? `Error: ` : `Success: `;
      return status + message;
    }

  return (
    hasLoaded ? (
    <div className="flex justify-center">
      <div className="container m-5 drop-shadow bg-sky-400 h-screen p-4" style={{ width: "800px" }}>
      <div className="text-black text-2xl font-bold font-serif">HomePage</div>
      <div className="mt-5 bg-lime-200 p-4 w-fit">From /api/data:  {text}</div>
      <div className="mt-10">

        <div className="flex flex-row">
          <input className='basis-3/4 border border-gray-200 p-2 w-full rounded duration-700 ease-in-out'
              name="postText" id="postText" onChange={e => setPostText(e.target.value)}
              value={postText}
              placeholder="Enter your message here"
              required/>
      
        
      <button type='button'  className="basis-1/4 m-2 p-4 hover:scale-100 scale-90 text-xl
                                        rounded-md bg-zinc-100 hover:bg-white duration-700 ease-in-out" 
                            onClick={e => handleClick()}>Post</button>      
        </div>
        
      </div>
      <button type='button'  className="m-6 p-4 hover:scale-110 rounded-md bg-zinc-100 
                                        hover:bg-white duration-700 ease-in-out border-black border" onClick={e => viewPost()}>View Post</button>
      { hide ? 
        <div/> 
        : <ViewPosts />
        
      }

    </div>
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
    
  ): <p className="p-10 text-xl">Loading.... Please Wait</p>)
}

export default HomePage