"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import * as d3Contour from "d3-contour";
import { createNoise2D } from "simplex-noise";

export const Contour: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries && entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    if (svg.parentElement) {
      resizeObserver.observe(svg.parentElement);
    }

    return () => {
      if (svg.parentElement) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (containerWidth === 0) return;

    const svg = d3.select(svgRef.current);
    const height: number = 200;
    const width: number = containerWidth;

    svg.attr("width", width).attr("height", height).selectAll("*").remove();

    const noise = createNoise2D();
    const resolution: number = 50;
    const scale: number = 0.03;
    const values: number[] = [];

    for (let y = 0; y < resolution; ++y) {
      for (let x = 0; x < resolution; ++x) {
        const noiseValue: number = noise(x * scale, y * scale);
        values.push(noiseValue);
      }
    }

    const contours = d3Contour
      .contours()
      .size([resolution, resolution])
      .thresholds(d3.range(-1, 1, 0.25))(values);

    const path = d3.geoPath(d3.geoIdentity().scale(width / resolution));

    svg
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", 1)
      .attr("y", 1)
      .attr("width", width - 2)
      .attr("height", height - 2);

    svg
      .append("g")
      .attr("fill", "none")
      .attr("clip-path", "url(#clip)")
      .attr("stroke", "#31343a")
      .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(contours)
      .join("path")
      .attr("d", path)
      .attr("stroke", (_, i) => (i === 3 ? "#33595e" : "#31343a"));
  }, [containerWidth]);

  return <svg ref={svgRef} style={{ width: "100%" }}></svg>;
};
