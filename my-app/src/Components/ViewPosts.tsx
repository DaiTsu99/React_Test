import React, { useState, useEffect, useRef } from "react";
import { Alert, Pressable, View, Text, StyleSheet, Modal } from 'react-native';
import Service from "../Services/Service";

import styles from '../Styles'
import Paginate from '../Paginate';
import { error } from "console";

const ViewPosts = () => {
    

    
    const [postInfos, setPostInfos] = useState<{id:number, message:string}[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    type UpdateStateType = {
        [id: number]: {
            status: boolean;
          nMessage: string;
        }
          
      };

    const [updateState, setUpdateState] = useState<UpdateStateType>({});

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(3);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postInfos.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber:number) => {
        setCurrentPage(pageNumber);
     };

    function wrap() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const fetchData = () => {
        Service.getPost().then((result)=> {
            let postData = result.data;
            console.log(result.data);
            postData.forEach(({id, message}:({id:number, message:string}))=>{
                // console.log(id, message);
                setUpdateState((prevUpdateState)=>({  
                    ...prevUpdateState,
                    [id]: {
                        status: false,
                        nMessage: message,
                        
                    },
                  })
            )});
            setPostInfos(result.data)
            
            setHasLoaded(true);
        });
    }

    const handleDelete = (e:any) => {
        let id = e.value
        // console.log("here" + id);
        Service.deletePost(id).then(async (result)=> {
            
            if(result.status == 201){
                setIsError(false);
                setMessage(result.data.message);
                setModalVisible(true);
                await wrap();
                setHasLoaded(false);
                fetchData();
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

    const handleEdit = (e:any) => {
        let id = e.value
        // console.log("here" + id);
        setUpdateState((prevUpdateState)=>({  
            ...prevUpdateState,
            [id]: {
                status: !prevUpdateState[id].status,
                nMessage: prevUpdateState[id].nMessage,
            },
          }))
    }

    const handleCancel = (e:any, message:string) => {
        let id = e.value
        // console.log("here" + id);
        setUpdateState((prevUpdateState)=>({  
            ...prevUpdateState,
            [id]: {
                status: !prevUpdateState[id].status,
                nMessage: message,
            },
          }))
    }

    const handleChange = (id:number, e:any) => {
        let message = e;
        // console.log("here" + id);
        setUpdateState((prevUpdateState)=>({  
            ...prevUpdateState,
            [id]: {
                status: true,
                nMessage: message
            },
          }))
    }

    const handleUpdate = (id:number) => {
        let message = updateState[id].nMessage;
        // console.log("here" + id);

        Service.updatePost(id, message).then(async (result)=> {
            
            if(result.status == 201){
                setIsError(false);

                
                setMessage(result.data.message);
                setModalVisible(true);
                await wrap();
                // window.location.reload();
                setHasLoaded(false);
                fetchData();
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

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
      }
    
    useEffect(() => {
        fetchData();
        
    }, []);

    return(
        hasLoaded ? <div>
            {postInfos.length > 0 && (
                <div className="m-10 drop-shadow-md bg-lime-200 p-4 grid grid-cols-1 gap-y-5">
                    {postInfos && 
                    currentPosts.map((post, indexP) =>(
                        <div key={indexP} className="text-lg font-semibold">
                            {/* <pre>{JSON.stringify(updateState[post.id], null, 2)}</pre> */}
                            {updateState[post.id] && updateState[post.id].status == false?
                            <div className="flex flex-row justify-between">
                                {post.message}
                                <div className="flex flex-row gap-x-4">
                                    <button type="button" className="bg-sky-200 w-fit p-4 hover:bg-sky-400 rounded" value={post.id} onClick={e => handleEdit(e.target)}>Edit</button>
                                    <button type="button" className="bg-red-200 w-fit p-4 hover:bg-red-400 rounded" value={post.id} onClick={e => handleDelete(e.target)}>Delete</button>
                                </div>
                                
                            </div> :
                            
                            <div className="flex flex-row">
                                <input className='basis-3/4 border border-gray-200 p-2 w-full rounded duration-700 ease-in-out'
                                    name="postUpdate" id="postUpdate" onChange={e => handleChange(post.id, e.target.value)}
                                    value={updateState[post.id].nMessage}
                                    placeholder="Enter your message here"
                                    required/>
                            
                                
                                <button type='button'  className="basis-1/4 m-2 p-4 hover:scale-100 scale-90 text-xl
                                                                rounded-md bg-zinc-300 hover:bg-white duration-700 ease-in-out" 
                                                    onClick={e => handleUpdate(post.id)}>Update</button>      
                                <button type='button' value={post.id}
                                                     className="basis-1/4 m-2 p-4 hover:scale-100 scale-90 text-xl
                                                                rounded-md bg-zinc-300 hover:bg-white duration-700 ease-in-out" 
                                                    onClick={e => handleCancel(e.target, post.message)}>Cancel</button>
                            </div>
                            
                            }
                            
                        </div>
                    ))
                    }
                </div>
            )}
            <Paginate
                  postsPerPage={postsPerPage}
                  totalPosts={postInfos.length}
                  paginate={paginate}
               />
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

export default ViewPosts