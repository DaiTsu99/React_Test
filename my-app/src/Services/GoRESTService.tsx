import http from "../http-common";

//NOTE 
//*Service File
//* Serving the transaction between application and GoREST API

// NOTE 
//^ Possible that there is no need to post data to backend when exchanging data with API
//^ as we only need to submit the required data

//& using GoREST API, create new post under selected user
const processData = (post:any, userId:string) =>{
    const title = post.title;
    const text = post.text;

    // console.log(title, text);

    let formData = new FormData();
    
    formData.append("userId", userId);
    formData.append("postTitle", title);
    formData.append("postText", text);
    
    // console.log(...formData);
    // console.log("here");

    return http.post("/processData", formData, {
        headers: {
        "Content-Type": "application/json",
        },
    });
}

//& get all posts under selected user
const getRESTPost = (userId:string) => {

    let formData = new FormData();
    // console.log(userId);
    formData.append("userId", userId)
    
    return http.post("/retrieveRESTPost", formData, {
        headers: {
        "Content-Type": "application/json",
        },
    });
}

//& delete selected post
const deleteRESTPost = (id:string) => {

    let formData = new FormData();
    let postId ="" + id
    formData.append("id", postId);
    
    
    // console.log(...formData);
    // console.log("here");

    return http.post("/deleteRESTPost", formData, {
        headers: {
        "Content-Type": "application/json",
        },
    });
}
//& get only one post based on postID
const getSingleRESTPost = (userId:string,postId:string) => {
    let formData = new FormData();
    
    formData.append("postId", postId)
    
    return http.post("/retrieveSingleRESTPost", formData, {
        headers: {
        "Content-Type": "application/json",
        },
    });
}

const updateRESTPost = (postId:string, postText:any) => {
    let formData = new FormData();
    
    const title = postText[postId].title;
    const text = postText[postId].text;
    formData.append("id", postId);
    formData.append("postTitle", title);
    formData.append("postText", text);
    
    
    // console.log(...formData);
    // console.log("here");

    return http.post("/updateRESTPost", formData, {
        headers: {
        "Content-Type": "application/json",
        },
    });
}

const GoRESTService = {
    processData,
    getRESTPost,
    deleteRESTPost,
    getSingleRESTPost,
    updateRESTPost
}

export default GoRESTService