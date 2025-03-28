/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "chart.js/auto";
import * as d3 from "d3";
import { Radar } from "react-chartjs-2";
import { generateText } from "@/app/utils/text_gen";
import styles from "./visual.module.css";

export const RadarGraph = () => {
  const getRandomData = () => {
    const data = Array.from({ length: 2 }, () =>
      Array.from({ length: 6 }, () => Math.floor(Math.random() * 80 + 20))
    );

    const baseColor = "rgba(49, 52, 58, 0.5)";
    const color = d3.color(baseColor)!;
    const backgroundColor = Array.from({ length: 2 }, () =>
      color.brighter(Math.random()).toString()
    );

    return {
      labels: Array.from({ length: 6 }, () =>
        Array.from({ length: 2 }, () => "")
      ),
      datasets: [
        {
          data: data[0],
          backgroundColor: backgroundColor[0],
          borderColor: "rgba(116, 173, 180, 0.5)",
        },
        {
          data: data[1],
          backgroundColor: backgroundColor[1],
        },
      ],
    };
  };

  const chartOptions = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    pointRadius: 0,
    scales: {
      r: {
        ticks: {
          display: false,
        },
        grid: {
          color: "rgba(49, 52, 58)",
        },
        angleLines: {
          color: "rgba(49, 52, 58)",
        },
        min: 0,
        max: 100,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.graphs}>
      <h3 className={styles.graphs_title}>
        {generateText("{{component}} {{measurement}}")}
      </h3>
      <div className={styles.radar_container}>
        <Radar data={getRandomData()} options={chartOptions as any} />
      </div>
    </div>
  );
};
