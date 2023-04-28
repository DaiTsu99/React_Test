import http from "../http-common";

const getString = () => {
    return http.get("/api/data");
};

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

const getPost = () => {
    return http.get("/retrievePost");
};

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