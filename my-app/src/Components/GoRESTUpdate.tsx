import React, { useState, useEffect, useRef, Dispatch } from "react";
import { Alert, Pressable, View, Text, StyleSheet, Modal } from 'react-native';
import Service from "../Services/GoRESTService";

import styles from '../Styles'
import Paginate from '../Paginate';
import { error } from "console";

  //*Implementation in TypeScript of Passing of Function as Prop to Child Component and Direct Passing of Object as Prop
  //*Able to set parent's state via handler function, object is passed directly 
  //* Eg.1. handleHidden to set hide to true in parent's component
  //* Eg.2. object is passed as obj: {} rather than obj :{obj :{}}

interface PropsFunction {
    handleHidden:(postId:string) => void;
    postI:any
  }

const GoRESTUpdate: React.FC<PropsFunction> = ({postI, handleHidden}) => {
    // console.log(postI)
    // console.log(handleHidden)
    
    const postInfos:{id:number, title:string, body:string}[] = [];
    postInfos.push(postI);
    // console.log(postInfos)
    
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(3);


    const [postText,setPostText] = useState<{[key:string]:{title: string, text:string}}>();

    function wrap() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
      }

    //&toggles changes in title field of specific post form
    const handleChangeUpdateTitle = (postId:number, title:string) => {
        setPostText((prevState)=>({
        ...prevState,
        [postId]:{
            title: title,
            text: postText![postId].text
        }
        }))
    }

    //&toggles changes in text field of specific post form
    const handleChangeUpdateText = (postId:number, text:string) => {
        setPostText((prevState)=>({
        ...prevState,
        [postId]:{
            title:postText![postId].title,
            text: text
        }
        }))
    }

    //& update selected GoREST post by passing post id, postText
    const handleUpdate = (e:any) => {
        let id = e.value

        // console.log(postText);
        
        
        Service.updateRESTPost(id,postText).then(async (result)=> {
            
            if(result.status == 201){
                setIsError(false);
                setMessage(result.data.message);
                setModalVisible(true);
                await wrap();
                window.location.reload();
            } else {
                setIsError(true);
                setMessage(result.data.message);
                setModalVisible(true);
            }
            
        }).catch (err => {
            setIsError(true);
            setMessage(err.response.data.message);
            console.log(err.response.data.message)
            setModalVisible(true);
        });
    }
    
    useEffect(() => {
        // console.log(post2Infos)
        postInfos.forEach((res:any)=> {
            const postId = res.id.toString();
            
            setPostText((prevState)=>({
                ...prevState,
                [postId]:{
                title:res.title,
                text:res.body
                }
            }))
        })
        setHasLoaded(true)
        
    }, []);

    return(
        hasLoaded ? <div>
            {postInfos.length > 0 && (
                    <div className="bg-lime-200 p-4 grid grid-cols-1 gap-y-5">
                        {postInfos && 
                        postInfos.map((post:any, indexP:number) =>(
                            <div key={indexP} className="text-md gap-x-4 font-semibold flex flex-row justify-center items-center">
                                                              
                                <div className="basis-3/4 flex flex-col gap-y-4">
                                    {/* <button onClick={e=>console.log(postText![post.id].title)}>Test</button> */}
                                    {/* {postText![post.id].text} */}
                                    <input className='border border-gray-200 p-2 w-full bg-zinc-100 focus:bg-white rounded-md duration-300 ease-in-out'
                                    name="postTitle" id="postTitle" onChange={e => handleChangeUpdateTitle(post.id, e.target.value)}
                                    
                                    value={postText![post.id].title}
                                    placeholder="Enter your post title here"
                                    required/>

                                    <textarea 
                                    // className='border border-gray-200 p-2 w-full rounded duration-700 ease-in-out'
                                    className="text-sm h-48 font-thin italic p-4 bg-zinc-100 focus:bg-white rounded-md duration-300 ease-in-out"
                                    name="postText" id="postText" onChange={e => handleChangeUpdateText(post.id, e.target.value)}
                                    value={postText![post.id].text}
                                    placeholder="Enter your message here"
                                    required/>

                                </div>
                                
                                <button type="button" className="bg-rose-400 text-white w-fit h-fit p-4 hover:bg-rose-600 rounded" 
                                        value={post.id} onClick={e => handleUpdate(e.target)}>Save
                                        </button>

                                <button type="button" className="bg-rose-400 text-white w-fit h-fit p-4 hover:bg-rose-600 rounded" 
                                        value={post.id} onClick={e => handleHidden(post.id)}>Back
                                        </button>
                            </div>
                        ))
                        }
                    </div>
                )} 
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
    )
}

export default GoRESTUpdate