import React from "react";
import { Line } from "react-chartjs-2";

interface IWPorps {
  time: string[];
  data: number[];
}

const WeatherHour = ({ time, data }: IWPorps) => {
  const options = {
    legend: {
      labels: {
        fontColor: "#cecece",
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "#fff",
            beginAtZero: false,
            callback: function (value: any) {
              return value + "\u00B0C";
            },
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "#fff",
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const chart = {
    labels: time,
    datasets: [
      {
        dataColor: "#fff",
        data,
        label: "temperature (\u00B0C)",
        lineTension: 0,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
      },
    ],
  };
  return (
    <div style={{ paddingTop: "2rem" }}>
      <Line data={chart} options={options} height={220} />
    </div>
  );
};

export default WeatherHour;
