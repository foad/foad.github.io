/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "chart.js/auto";
import * as d3 from "d3";
import { Bar } from "react-chartjs-2";
import styles from "./visual.module.css";

export const Graphs = () => {
  const randomBar = Math.floor(Math.random() * 4) + 1;
  const randomIndex = Math.floor(Math.random() * 6);

  const getRandomData = (bar_num: number) => {
    const data = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 80 + 20)
    );

    const baseColor = "#31343a";
    const backgroundColor = Array.from({ length: 6 }, () => {
      const color = d3.color(baseColor)!;
      return color.brighter(Math.random()).toString();
    });

    if (bar_num === randomBar) {
      backgroundColor[randomIndex] = "#74adb4";
    }

    return {
      labels: Array.from({ length: 6 }, () => ""),
      datasets: [
        {
          data,
          backgroundColor,
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
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.graphs}>
      <h3 className={styles.title}>Echo Graphs</h3>
      <div className={styles.bar_container}>
        <div className={styles.bar}>
          <Bar data={getRandomData(1)} options={chartOptions as any} />
        </div>
        <div className={styles.bar}>
          <Bar data={getRandomData(2)} options={chartOptions as any} />
        </div>
        <div className={styles.bar}>
          <Bar data={getRandomData(3)} options={chartOptions as any} />
        </div>
        <div className={styles.bar}>
          <Bar data={getRandomData(4)} options={chartOptions as any} />
        </div>
      </div>
      <div className={styles.labels_container}>
        <span className={styles.bar_label}>A-1</span>
        <span className={styles.bar_label}>A-2</span>
        <span className={styles.bar_label}>A-3</span>
        <span className={styles.bar_label}>A-4</span>
      </div>
    </div>
  );
};
