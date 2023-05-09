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

const Service = {
    getString,
    postMessage,
    getPost,
    deletePost
}

export default Service