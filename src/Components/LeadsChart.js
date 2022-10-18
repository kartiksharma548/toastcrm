// @ts-ignore
import React, { useEffect, useState } from 'react';

// @ts-ignore
import { Pie, Line } from 'react-chartjs-2';
// @ts-ignore
import localService from '../services/local.service'
import '../styles/leads.css'
// @ts-ignore
import { getLeadChartData,getClientConversionData } from '../services/leadService'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement
// @ts-ignore
} from "chart.js";


ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
);
export default function LeadsChart() {
    // @ts-ignore
    let user = JSON.parse(localService.get('user'));
    useEffect(() => {
        getLeadData()
        getLeadConversion()
        return () => {

        }
    }, [])
    const [data, setdata] = useState({
        labels: [],
        datasets: [{
            label: "Statuses",
            data: []
        }]
    });

    const [linedata, setlinedata] = useState({
        labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        datasets: [{
            label: "Statuses",
            data: []
        }]
    });

    const getLeadData = async () => {
        let response = await getLeadChartData(user.id);
        let chartData = response.data;
        let chartObj = {
            // @ts-ignore
            labels: chartData.map((x) => x.text),
            datasets: [{
                label: "Statuses",
                

                // @ts-ignore
                data: chartData.map((x) => x.value),
                // @ts-ignore
                backgroundColor: chartData.map((x) => x.color)
            }

            ]

        }
        setdata(chartObj)
    }

    const getLeadConversion = async () => {
        let response = await getClientConversionData(4);
        // @ts-ignore
        let chartData = response.data;
        let newArray=new Array(12);
        // @ts-ignore
        response.data.forEach(element => {
            newArray[parseInt(element['Month'])]=element['Count']
        });
       
        
        let chartObj = {
            
            datasets: [{
                label: "Leads converted",
                

                data: newArray ,
                backgroundColor: 'green'
            }

            ]

        }
        // @ts-ignore
        setlinedata((prev)=>({...prev,...chartObj}))
    }




    // @ts-ignore
    let width = 500;

    // @ts-ignore
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    // @ts-ignore
    const handleBarClick = (element, id) => {
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    }
    return (
        <div className='d-flex align-items-center justify-content-between'>
            <div style={{ width: '500px'}}>
                <Line
                    data={linedata}


                />
            </div>
            <div style={{ width: '300px', float: 'right' }} id="pieChartDiv">

                <Pie

                    data={data}


                />
            </div>
        </div>
    )
}
