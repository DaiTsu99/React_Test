import http from "../http-common";

const getRaspberry = () => {
    return http.get("/getDynamo");
}

const getRaspberryClone = () => {
    return http.get("/getDynamoClone");
}

const copyRaspberry = (res:any) => {
    console.log(res)
    let formData = new FormData();
    res.forEach((item:any) => formData.append("raspData[]", JSON.stringify(item)))

    // console.log(formData.getAll("raspData[]"))

    return http.post("/cloneDynamo", formData, {
        headers: {
        "Content-Type": "application/json",
        },
    }); 
}

const getFilteredRaspberryTime = (fromTime:string, toTime:string) => {
    console.log(fromTime)
    console.log(toTime)
    let formData = new FormData();
    // // console.log(userId);
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



}

const AWSService = {
    getRaspberry,
    getFilteredRaspberryTime,
    copyRaspberry,
    getRaspberryClone
}

export default AWSService