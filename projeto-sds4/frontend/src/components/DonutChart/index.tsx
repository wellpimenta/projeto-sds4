import Chart from "react-apexcharts";
import axios from 'axios';
import { SalesSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';
import { useState, useEffect } from 'react';

type ChartData  = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: []});    
    //FORMA ERRADA
    //let chartData: ChartData = { labels: [], series: []};

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
        .then(response => {
            const data = response.data as SalesSum[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => x.sum);

            setChartData({ labels: myLabels, series: mySeries});

            console.log(response.data);
        });
    }, []);


    
    //const mockData = {
    //    series: [477138, 499928, 444867, 220426, 473088],
    //    labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    //}
    
    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{...options, labels:chartData.labels}}            
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;