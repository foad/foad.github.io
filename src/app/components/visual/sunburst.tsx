/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface SunburstData {
  children?: SunburstData[];
  value?: number;
}

type SunburstArcObject = d3.DefaultArcObject & {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
};

interface SunburstProps {
  width?: number;
  height?: number;
}

export const Sunburst = ({ width = 600, height = 600 }: SunburstProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const baseColor = "#31343a";

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const radius = Math.min(width, height) / 2;

    const partition = (data: SunburstData) =>
      d3.partition<SunburstData>().size([2 * Math.PI, radius])(
        d3.hierarchy(data).sum((d) => d.value ?? 0)
      );

    const arc = d3
      .arc<SunburstArcObject>()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle(1 / radius)
      .padRadius(radius)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1);

    const maxDepth = 3;
    const minValue = 20;
    const maxValue = 100;
    const maxChildren = 5;
    const generateRandomData = (depth = 0): SunburstData => {
      if (depth >= maxDepth || (depth > 0 && Math.random() < 0.2)) {
        return {
          value: Math.floor(Math.random() * (maxValue - minValue)) + minValue,
        };
      } else {
        let numChildren = Math.floor(Math.random() * maxChildren) + 1;
        if (depth === 0) {
          numChildren = maxChildren;
        }
        const children: SunburstData[] = Array.from(
          { length: numChildren },
          () => generateRandomData(depth + 1)
        );
        return { children };
      }
    };

    const data = generateRandomData();
    const root = partition(data);

    const randomIndex = Math.floor(Math.random() * root.descendants().length);

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("text-anchor", "middle")
      .attr("font-size", 10);

    svg
      .append("g")
      .selectAll("path")
      .data(root.descendants().filter((d) => d.depth))
      .join("path")
      .attr("fill", (_, i) => {
        if (i === randomIndex) {
          return "#74adb4";
        }
        const color = d3.color(baseColor)!;
        return color.brighter(Math.random() * 0.5).toString();
      })
      .attr("d", arc as any);
  }, [width, height]);

  return <svg ref={svgRef}></svg>;
};
