import React, { useState, useEffect } from "react";
import { Alert, Pressable, View, Text,  Modal } from 'react-native';
import Service from "../Services/GoRESTService";

import styles from '../Styles'
import Paginate from '../Paginate';
// import { error } from "console";
import GoRESTUpdate from "./GoRESTUpdate";

const GoRESTPost = (currUser:any) => {
    
    const [postInfos, setPostInfos] = useState<{id:number, title:string, body:string}[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(3);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postInfos.slice(indexOfFirstPost, indexOfLastPost);

    const [hide, setHidden] = useState<{[key:string]:boolean}>();
    // const [postId, setPostId] = useState<number>();
    const paginate = (pageNumber:number) => {
        setCurrentPage(pageNumber);
     };

    function wrap() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const displayUpdate = async (e:any) =>{
        
        let postIdVal = e.value;
        // setPostId(postIdVal);
        Service.getSingleRESTPost(currUser.userId, postIdVal).then((result)=> {
            // console.log(result.data)
            setPostInfos(result.data.posts)
           
        });
        
        setHidden((prevState)=>({
            ...prevState,
            [postIdVal]:true
        }))
    }

    //& delete selected GoREST post by passing post id
    const handleDelete = (e:any) => {
        let id = e.value
        
        // console.log("here" + id);
        Service.deleteRESTPost(id).then(async (result)=> {
            
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
    
    const handleHidden = (postId:any) => {
        setHidden ((prevState)=>({
            ...prevState,
            [postId]:false
        }))

        Service.getRESTPost(currUser.userId).then((result)=> {
            // console.log(result.data)
            setPostInfos(result.data.posts)

            const response = result.data.posts;

            response.forEach((res:any)=> {
                const postId = res.id.toString();
                
                setHidden ((prevState)=>({
                    ...prevState,
                    [postId]:false
                }))
            })
            
            setHasLoaded(true);
        });
    }
    

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
      }
    
    useEffect(() => {
        // console.log(currUser)
        //& retrieve all posts under given user id
        Service.getRESTPost(currUser.userId).then((result)=> {
            // console.log(result.data)
            setPostInfos(result.data.posts)

            const response = result.data.posts;

            response.forEach((res:any)=> {
                const postId = res.id.toString();
                
                setHidden ((prevState)=>({
                    ...prevState,
                    [postId]:false
                }))
            })
            
            setHasLoaded(true);
        });
        
        
    }, []);

    return(
        hasLoaded ? <div>
            
            <div>
            {postInfos.length > 0 ? (
                <div className="m-10 drop-shadow bg-lime-200 p-4 grid grid-cols-1 gap-y-5">
                    {postInfos && 
                    currentPosts.map((post, indexP) =>(
                        <div key={indexP} >
                            {hide![post.id] ? 
                                <GoRESTUpdate postI={post} handleHidden={handleHidden}/>:
                            <div className="text-lg font-semibold flex flex-row justify-between items-center gap-x-2">
                            
                            <div>
                               {post.title} 
                            </div>
                            <div className="text-sm basis-3/4 font-thin italic p-4 bg-zinc-200 rounded-md">
                                {post.body}
                            </div>
                            
                            <button type="button" className="bg-blue-200 w-fit h-fit p-4 hover:bg-blue-400 rounded" 
                                    value={post.id} onClick={e => displayUpdate(e.target)}>Update
                                    </button>
                            <button type="button" className="bg-red-200 w-fit h-fit p-4 hover:bg-red-400 rounded" 
                                    value={post.id} onClick={e => handleDelete(e.target)}>Delete
                                    </button>
                            </div>
                    }
                        </div>
                    ))
                    }
                </div>
            ):
            <div>No Posts Under This User</div>
            }
            </div>
            
            
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

export default GoRESTPost