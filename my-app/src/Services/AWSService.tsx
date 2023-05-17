import http from "../http-common";

const getRaspberry = () => {
    return http.get("/getDynamo");
}

const getFilteredRaspberryTime = (fromTime:string, toTime:string) => {
    console.log(fromTime)
    console.log(toTime)
    let formData = new FormData();
    // // console.log(userId);
<<<<<<< HEAD

=======
    
>>>>>>> 58150877d069e1a428f04e5897081764cb800bd1
    formData.append("fromTime", fromTime)  
    formData.append("toTime", toTime)

    if(fromTime != "None" && toTime != "None"){
        return http.post("/getFilteredTimeDynamoFromAndTo", formData, {
            headers: {
            "Content-Type": "application/json",
            },
        }); 
    } else if(fromTime != "None" && toTime == "None"){
        return http.post("/getFilteredTimeDynamoFrom", formData, {
            headers: {
            "Content-Type": "application/json",
            },
            }); 
    } else if(fromTime == "None" && toTime != "None"){
       return http.post("/getFilteredTimeDynamoTo", formData, {
        headers: {
        "Content-Type": "application/json",
        },
        }); 
    } 
<<<<<<< HEAD



=======
    

    
>>>>>>> 58150877d069e1a428f04e5897081764cb800bd1
}

const AWSService = {
    getRaspberry,
    getFilteredRaspberryTime
}

export default AWSService