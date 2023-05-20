import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";

import Pagination from 'rc-pagination';
import './../../Pagination.css'

interface PropsFunction {
  chartData:any;
  optionYmin: number;
  optionYmax: number;
  optionY1min: number;
  optionY1max: number;
  stepSize: number;
  textTitle: string;
}

const LineChart: React.FC<PropsFunction> = ({chartData,optionYmin, optionYmax, optionY1min, optionY1max,stepSize, textTitle}) => {
    // console.log(chartData);
    // console.log(chartData.labels);

    const [perPage, setPerPage] = useState(20);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);

    const PerPageChange = (value:number) => {
        setSize(value);
        const newPerPage = Math.ceil(chartData.labels.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData1 = (current:number, pageSize:number) => {
      // Normally you should get the data from the server
      return {
        labels:chartData.labels.slice((current - 1) * pageSize, current * pageSize),
        datasets:[
          {
            type: chartData.datasets[1].type,
            backgroundColor: chartData.datasets[1].backgroundColor,
            borderColor: chartData.datasets[1].borderColor,
            borderWidth: chartData.datasets[1].borderWidth,
            label: chartData.datasets[1].label,
            data: chartData.datasets[1].data.slice((current - 1) * pageSize, current * pageSize),
            yAxisID: 'y',
          },
          {
            type: chartData.datasets[0].type,
            backgroundColor: chartData.datasets[0].backgroundColor,
            borderColor: chartData.datasets[0].borderColor,
            borderWidth: chartData.datasets[0].borderWidth,
            label: chartData.datasets[0].label,
            data: chartData.datasets[0].data.slice((current - 1) * pageSize, current * pageSize),
            yAxisID: 'y1',
          }
        ]
        
      };
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

    return (
        <div className="chart-container flex justify-center rounded-md drop-shadow bg-lime-300 p-2">
          <div className="w-5/6 flex flex-col">
            {/* <h2 style={{ textAlign: "center" }}>Line Chart</h2> */}
            <Chart
            className="mb-6"
            height="900"
            width="1078"
            data={getData1(current, size)}
            options={{
              responsive: true,
              barPercentage: 0.2,
              categoryPercentage: 2,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              plugins: {
                title: {
                  display: true,
                  text: textTitle
                },
                legend: {
                  display: true
                }
              },
              scales: {
                y: {
                  min: optionYmin,
                  max: optionYmax,
                  ticks: {
                    // forces step size to be 50 units
                    stepSize: stepSize
                  },
                  position: 'left',
                  grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                  },
                  title: {
                  display: true,
                  text: 'Temperature °C',
                  },
                },
                y1: {
                  min: optionY1min,
                  max: optionY1max,
                  type: 'linear',
                  position: 'right',
                  
                  // grid line settings
                  grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                  },
                  title: {
                  display: true,
                  text: 'Humidity %',
                
              },
                },
                
              },
              
                
              
              
            }} type={undefined}            />
            <Pagination
                        className="pagination-data"
                        showTotal={(total:number, range:any) => `Showing ${range[0]}-${range[1]} of ${total}`}
                        onChange={PaginationChange}
                        total={chartData.labels.length}
                        current={current}
                        pageSize={size}
                        showSizeChanger={false}
                        itemRender={PrevNextArrow}
                        onShowSizeChange={PerPageChange}
                    />
          </div>
          
        </div>
      );
}
export default LineChart