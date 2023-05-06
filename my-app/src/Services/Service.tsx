import http from "../http-common";

//NOTE 
//*Service File to accomodate/be as gateway between front-end and back-end

//& retrieve message string from /api/data
const getString = () => {
    return http.get("/api/data");
};

//& insert new post into database
const postMessage = (postText:any) => {

    let formData = new FormData();
    
    formData.append("postText", postText);
    
    // console.log(...formData);
    // console.log("here");

    return http.post("/uploadPost", formData, {
        headers: {
        "Content-Type": "application/json",
        },
    });
}

//& retrieve all posts in database
const getPost = () => {
    return http.get("/retrievePost");
};

//& delete selected post in database
const deletePost = (id:number) => {

    let formData = new FormData();
    let postId ="" + id
    formData.append("id", postId);
    
    // console.log(...formData);
    // console.log("here");

    return http.post("/deletePost", formData, {
        headers: {
        "Content-Type": "application/json",
        },
    });
}

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

const Service = {
    getString,
    postMessage,
    getPost,
    deletePost,
    processData,
    getRESTPost,
    deleteRESTPost
}

export default Service