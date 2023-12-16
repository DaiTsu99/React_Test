import React, { useState, useEffect } from "react";
import { Alert, Pressable, View, Text, Modal } from 'react-native';
import Service from "../Services/AWSService";

import Pagination from 'rc-pagination';
import './../Pagination.css'
import styles from '../Styles'
// import { error } from "console";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./Chart/AWS_Chart";

const AWS_Raspberry = () => {
    
    const [iotInfos, setIotInfos] = useState<{
                                            
                                            payload :{temperature:number, humidity:number, pressure:number },
                                            client_id:string, 
                                            timestamp:number
                                        }[]>([]);
    // const [iotInfos, setIotInfos] = useState<{
    //                                         client_id:string, 
    //                                         payload :{humidity:number, pressure:number, temperature:number},
    //                                         timestamp:number
    //                                     }[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [perPage, setPerPage] = useState(20);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);

    const PerPageChange = (value:number) => {
        setSize(value);
        const newPerPage = Math.ceil(iotInfos.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current:number, pageSize:number) => {
        // Normally you should get the data from the server
        return iotInfos.slice((current - 1) * pageSize, current * pageSize);
    };

    const PaginationChange = (page:number, pageSize:number) => {
        setCurrent(page);
        setSize(pageSize)
    }

    const PrevNextArrow = (current:any, type:any, originalElement:any) => {
        if (type === 'prev') {
            return <button><i className="fa fa-angle-double-left"></i></button>;
        }
        if (type === 'next') {
            return <button><i className="fa fa-angle-double-right"></i></button>;
        }
        return originalElement;
    }

    const [day1, setDay1] = useState<string>("0");
    const [month1, setMonth1] = useState<string>("0");
    const [year1, setYear1] = useState<string>("2023");

    const [hour1, setHour1] = useState<string>("0");
    const [minute1, setMinute1] = useState<string>("0");
    const [second1, setSecond1] = useState<string>("0");

    const [day2, setDay2] = useState<string>("0");
    const [month2, setMonth2] = useState<string>("0");
    const [year2, setYear2] = useState<string>("2023");

    const [hour2, setHour2] = useState<string>("0");
    const [minute2, setMinute2] = useState<string>("0");
    const [second2, setSecond2] = useState<string>("0");
    
    const [chartData, setChartData] = useState<{
        labels: string[], 
        datasets: 
          {
            type:string,
            label: string,
            data: number[],
            backgroundColor: string[],
            yAxisID: string,
            borderColor: string,
            borderWidth: number
          }[]
      }>();

      const [chartData2, setChartData2] = useState<{
        labels: string[], 
        datasets: 
          {
            label: string,
            data: number[],
            backgroundColor: string[],
            borderColor: string,
            borderWidth: number
          }[]
      }>();

    function wrap() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }
    
    const timeFormat = (timestamp:any) => {
        return new Date(timestamp).toLocaleString('ja-JP', { timeZone: 'Japan' })
    }
    
    const filterTime = () => {
        const day1NullorZero = (day1 !== null && day1 !== "0")
        const day2NullorZero = (day2 !== null && day2 !== "0")
        const month1NullorZero = (month1 !== null && month1 !== "0")
        const month2NullorZero = (month2 !== null && month2 !== "0")
        const year1NullorZero = (year1 !== null && year1 !== "0")
        const year2NullorZero = (year2 !== null && year2 !== "0")

        if((day1NullorZero && month1NullorZero && year1NullorZero && 
            hour1 !== null && minute1 !== null && second1 !== null ) && 
            (day2NullorZero && month2NullorZero && year2NullorZero && 
            hour2 !== null && minute2 !== null && second2 !== null )){
                const timeString1 = year1 + "/" + month1 + "/" + day1 + " " + hour1 + ":" + minute1 + ":" + second1 + " GMT+9:00"
                const timeString2 = year2 + "/" + month2 + "/" + day2 + " " + hour2 + ":" + minute2 + ":" + second2 + " GMT+9:00"

                const fromTime = new Date(timeString1)
                const toTime = new Date(timeString2)

                Service.getFilteredRaspberryTime(fromTime.getTime().toString(), toTime.getTime().toString())!.then((result) => {
                    console.log(result.data)
                    setIotInfos(result.data.iot)

                    setChartData({
                        labels: result.data.iot.map((dataI:any) => new Date(dataI.timestamp).toLocaleString('ja-JP', { timeZone: 'Japan' })), 
                        datasets: [
                        {
                            type: "bar",
                            label: "Humidity 湿度",
                            data: result.data.iot.map((dataI:any) => dataI.payload.humidity),
                            backgroundColor: [
                            "#FFFF"
                            ],
                            yAxisID: 'y-axis-1',
                            borderColor: "black",
                            borderWidth: 2
                        },
                        {
                            type: "line",
                            label: "Temperature 気温",
                            data: result.data.iot.map((dataI:any) => dataI.payload.temperature),
                            backgroundColor: [
                            "#0000FF"
                            ],
                            yAxisID: 'y-axis-2',
                            borderColor: "blue",
                            borderWidth: 2
                          }
                        ]
                    })
                });
        } else if(day1NullorZero && month1NullorZero && year1NullorZero && 
            hour1 !== null && minute1 !== null && second1 !== null ){
            const timeString = year1 + "/" + month1 + "/" + day1 + " " + hour1 + ":" + minute1 + ":" + second1 + " GMT+9:00"
            const fromTime = new Date(timeString)
            Service.getFilteredRaspberryTime(fromTime.getTime().toString(), "None")!.then((result) => {
                console.log(result.data)    
                setIotInfos(result.data.iot)

                setChartData({
                    labels: result.data.iot.map((dataI:any) => new Date(dataI.timestamp).toLocaleString('ja-JP', { timeZone: 'Japan' })), 
                    datasets: [
                    {
                        type: "bar",
                        label: "Humidity 湿度",
                        data: result.data.iot.map((dataI:any) => dataI.payload.humidity),
                        backgroundColor: [
                        "#FFFF"
                        ],
                        yAxisID: 'y-axis-1',
                        borderColor: "black",
                        borderWidth: 2
                    },
                    {
                        type: "line",
                        label: "Temperature 気温",
                        data: result.data.iot.map((dataI:any) => dataI.payload.temperature),
                        backgroundColor: [
                        "#0000FF"
                        ],
                        yAxisID: 'y-axis-2',
                        borderColor: "blue",
                        borderWidth: 2
                      }
                    ]
                })
            });
        } else if(day2NullorZero && month2NullorZero && year2NullorZero && 
            hour2 !== null && minute2 !== null && second2 !== null ){
            const timeString = year2 + "/" + month2 + "/" + day2 + " " + hour2 + ":" + minute2 + ":" + second2 + " GMT+9:00"
            const toTime = new Date(timeString)
            Service.getFilteredRaspberryTime("None", toTime.getTime().toString())!.then((result) => {
                console.log(result.data)    
                setIotInfos(result.data.iot)

                setChartData({
                    labels: result.data.iot.map((dataI:any) => new Date(dataI.timestamp).toLocaleString('ja-JP', { timeZone: 'Japan' })), 
                    datasets: [
                    {
                        type: "bar",
                        label: "Humidity 湿度",
                        data: result.data.iot.map((dataI:any) => dataI.payload.humidity),
                        backgroundColor: [
                        "#FFFF"
                        ],
                        yAxisID: 'y-axis-1',
                        borderColor: "black",
                        borderWidth: 2
                    },
                    {
                        type: "line",
                        label: "Temperature 気温",
                        data: result.data.iot.map((dataI:any) => dataI.payload.temperature),
                        backgroundColor: [
                        "#0000FF"
                        ],
                        yAxisID: 'y-axis-2',
                        borderColor: "blue",
                        borderWidth: 2
                      }
                    ]
                })
            });
        } else {
            console.log("Not Found")
        }
        
    }
    

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
      }
    
    useEffect(() => {
        
        //& retrieve all data
        // sampleData.forEach((item:any)=> {
        //     if(!iotInfos.includes(item)){
        //         iotInfos.push(item) 
        //     }
        // })
        // console.log(iotInfos)

        // Service.getRaspberry().then((result)=> {
        //     console.log(result.data.iot)
        //     setIotInfos(result.data.iot)
        Service.getRaspberryClone().then((result)=> {
            console.log(result.data.iot)
            setIotInfos(result.data.iot)

            // const response = result.data.iot;

            // Service.copyRaspberry(response).then((result)=>{
            //     console.log(result.data.message)
            // })

            setChartData({
                labels: result.data.iot.map((dataI:any) => new Date(dataI.timestamp).toLocaleString('ja-JP', { timeZone: 'Japan' })), 
                datasets: [
                {
                    type: "bar",
                    label: "Humidity 湿度",
                    data: result.data.iot.map((dataI:any) => dataI.payload.humidity),
                    backgroundColor: [
                    "#FFFF"
                    ],
                    yAxisID: 'y-axis-1',
                    borderColor: "black",
                    borderWidth: 2
                },
                {
                    type: "line",
                    label: "Temperature 気温",
                    data: result.data.iot.map((dataI:any) => dataI.payload.temperature),
                    backgroundColor: [
                    //   "rgba(75,192,192,1)",
                    //   "#50AF95",
                    //   "#f3ba2f",
                    //   "#f3ba2f",
                    //   "#2a71d0"
                    "#0000FF"
                    ],
                    yAxisID: 'y-axis-2',
                    borderColor: "blue",
                    borderWidth: 2
                  }
                ]
            })
            // setChartData2({
            //     labels: result.data.map((dataI:any) => new Date(dataI.timestamp).toLocaleString('ja-JP', { timeZone: 'Japan' })), 
            //     datasets: [
            //       {
            //         label: "Temperature ",
            //         data: result.data.map((dataI:any) => dataI.payload.temperature),
            //         backgroundColor: [
            //           "rgba(75,192,192,1)",
            //           "#50AF95",
            //           "#f3ba2f",
            //           "#f3ba2f",
            //           "#2a71d0"
            //         ],
            //         borderColor: "black",
            //         borderWidth: 2
            //       }
            //     ]
            //   })
            
            setHasLoaded(true);
        });

        // setHasLoaded(true);
        
    }, []);

    return(
        hasLoaded ? <div className="font-[Poppins] p-10 h-full bg-cover
                                bg-gradient-to-b from-emerald-300 from-30% via-emerald-400 to-90% to-white">
            
            
            <LineChart
                chartData={chartData} optionYmin={20} optionYmax={30} optionY1min={10} optionY1max={100} 
                stepSize={5} textTitle="Humidity & Temperature"/>

            <div className="p-2 m-2">
                Set Rows Per Page | 1ページあたりの行数を設定する
                <input className='border border-gray-200 p-2 w-full rounded duration-700 ease-in-out'
                        type="number"
                    name="perPage" id="perPage" onChange={e => setSize(e.target.valueAsNumber)}
                    value={size}
                    placeholder="Enter rows per page here"/>
            </div>

            <div className="flex flex-row justify-center items-center gap-x-10 p-2">

                <div className="flex flex-col">
                    <div className="font-semibold text-sm">
                        From
                    </div>
                    
                    <div className="flex flex-row gap-x-2">
                        <div className="flex flex-col items-center">
                            Day
                            <input className='border border-gray-200 p-1 w-24 rounded duration-700 ease-in-out'
                            name="day1" id="day1" onChange={e => setDay1(e.target.value)}
                            value={day1}
                            placeholder="Day"/>
                        </div>
                        <div className="flex flex-col items-center">
                            Month
                            <input className='border border-gray-200 p-1 w-24 rounded duration-700 ease-in-out'
                                
                            name="month1" id="month1" onChange={e => setMonth1(e.target.value)}
                            value={month1}
                            placeholder="Month"/>
                        </div>
                        <div className="flex flex-col items-center">
                            Year
                            <input className='border border-gray-200 p-1 w-24 rounded duration-700 ease-in-out'
                                
                            name="year1" id="year1" onChange={e => setYear1(e.target.value)}
                            value={year1}
                            placeholder="Year"/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-2 mt-4">
                        <div className="flex flex-row gap-x-2">
                            Hr:
                            <input className='border border-gray-200 p-1 w-16 rounded duration-700 ease-in-out'
                                
                            name="hour1" id="hour1" onChange={e => setHour1(e.target.value)}
                            value={hour1}
                            placeholder="hr"/>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            Min:
                            <input className='border border-gray-200 p-1 w-16 rounded duration-700 ease-in-out'
                                
                            name="minute1" id="minute1" onChange={e => setMinute1(e.target.value)}
                            value={minute1}
                            placeholder="min"/>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            Sec:
                            <input className='border border-gray-200 p-1 w-16 rounded duration-700 ease-in-out'
                                
                            name="second1" id="second1" onChange={e => setSecond1(e.target.value)}
                            value={second1}
                            placeholder="s"/>
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold text-sm">
                        To
                    </div>
                    <div className="flex flex-row gap-x-2">
                        <div className="flex flex-col items-center">
                        Day
                        <input className='border border-gray-200 p-1 w-24 rounded duration-700 ease-in-out'
                            
                        name="day2" id="day2" onChange={e => setDay2(e.target.value)}
                        value={day2}
                        placeholder="Day"/>
                        </div>
                        <div className="flex flex-col items-center">
                            Month
                            <input className='border border-gray-200 p-1 w-24 rounded duration-700 ease-in-out'
                                
                            name="month2" id="month2" onChange={e => setMonth2(e.target.value)}
                            value={month2}
                            placeholder="Month"/>
                        </div>
                        <div className="flex flex-col items-center">
                            Year
                            <input className='border border-gray-200 p-1 w-24 rounded duration-700 ease-in-out'
                                
                            name="year2" id="year2" onChange={e => setYear2(e.target.value)}
                            value={year2}
                            placeholder="Year"/>
                        </div>
                    </div>
                    
                    <div className="flex flex-row gap-x-2 mt-4">
                        <div className="flex flex-row gap-x-2">
                            Hr:
                            <input className='border border-gray-200 p-1 w-16 rounded duration-700 ease-in-out'
                                
                            name="hour2" id="hour2" onChange={e => setHour2(e.target.value)}
                            value={hour2}
                            placeholder="hr"/>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            Min:
                            <input className='border border-gray-200 p-1 w-16 rounded duration-700 ease-in-out'
                                
                            name="minute2" id="minute2" onChange={e => setMinute2(e.target.value)}
                            value={minute2}
                            placeholder="min"/>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            Sec:
                            <input className='border border-gray-200 p-1 w-16 rounded duration-700 ease-in-out'
                                
                            name="second2" id="second2" onChange={e => setSecond2(e.target.value)}
                            value={second2}
                            placeholder="s"/>
                        </div>
                    </div>
                    
                </div>
                <button type="button" className="bg-blue-200 w-fit h-fit p-4 hover:bg-blue-400 rounded" 
                                            onClick={e => filterTime()}>Filter
                                            </button>
            </div>
            
            <div>
            {iotInfos.length > 0 && (
                <div className="m-10 drop-shadow bg-lime-200 p-4 grid grid-cols-1 gap-y-5">
                    <Pagination
                                    className="pagination-data"
                                    showTotal={(total:number, range:any) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                    onChange={PaginationChange}
                                    total={iotInfos.length}
                                    current={current}
                                    pageSize={size}
                                    showSizeChanger={false}
                                    itemRender={PrevNextArrow}
                                    onShowSizeChange={PerPageChange}
                                />
                    <table className="border-separate">
                        <thead>
                            <tr>
                                <th className="border-b-4 border-black">ClientId</th>
                                <th className="border-b-4 border-black">TimeStamp</th>
                                <th className="border-b-4 border-black">Humidity% | 湿度 %</th>
                                <th className="border-b-4 border-black">Temperature &deg;C | 気温 &deg;C</th>
                                <th className="border-b-4 border-black">Pressure | 大気圧</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                        {iotInfos && 
                            getData(current, size).map((post, indexP) =>(
                                <tr key={indexP} className="text-md font-semibold text-center bg-zinc-200">
                                        <td>
                                            {post.client_id} 
                                        </td>
                                        <td>
                                        『{timeFormat(post.timestamp)}』 
                                        </td>
                                        <td>
                                            {post.payload.humidity} 
                                        </td>
                                        <td className="text-sm font-thin italic p-4 rounded-md">
                                            {post.payload.temperature} 
                                        </td>
                                        <td className="text-sm font-thin italic p-4 rounded-md">
                                            {post.payload.pressure} 
                                        </td>
                                    
                                    {/* <button type="button" className="bg-blue-200 w-fit h-fit p-4 hover:bg-blue-400 rounded" 
                                            value={post.id} onClick={e => displayUpdate(e.target)}>Update
                                            </button>
                                    <button type="button" className="bg-red-200 w-fit h-fit p-4 hover:bg-red-400 rounded" 
                                            value={post.id} onClick={e => handleDelete(e.target)}>Delete
                                            </button> */}
                                </tr>
                                
                        ))
                        }
                        </tbody>
                    </table>
                    <Pagination
                                    className="pagination-data"
                                    showTotal={(total:number, range:any) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                    onChange={PaginationChange}
                                    total={iotInfos.length}
                                    current={current}
                                    pageSize={size}
                                    showSizeChanger={false}
                                    itemRender={PrevNextArrow}
                                    onShowSizeChange={PerPageChange}
                                />
                </div>
            )}
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
        : <div className="p-10 flex flex-row font-semibold text-xl items-center"> 
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading Page
        </div>
    )
}

export default AWS_Raspberry