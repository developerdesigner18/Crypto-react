import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = ({ params, day }) => {
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://coinranking1.p.rapidapi.com/coin/${params}/history?${day}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff7061690dmshfd3e9f86e03558ap172814jsne4ba9b39c8b0",
      },
    })
      .then((res) => res.json())
      .then((allChartdata) => {
        setChart(allChartdata.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.log(error);
      });
  }, [params, day]);

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const getDate = (timestamp) => {
    const day = new Date(timestamp).getDay();
    const date = new Date(timestamp).getDate();
    const year = new Date(timestamp).getFullYear();
    return `${day}/${date}/${year}`;
  };

  const labels = chart?.history?.map((chartData) => {
    return getDate(chartData.timestamp);
  });
  const prices = chart?.history?.map((chartData) => {
    return chartData.price;
  });
  const data = {
    labels,
    datasets: [
      {
        label: "Price In USD",
        data: prices,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};
