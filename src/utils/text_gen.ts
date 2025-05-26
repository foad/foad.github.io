const components = [
  "Power",
  "Substrate",
  "Thermal",
  "Energy",
  "Magnet",
  "Resonance",
  "Vibration",
  "Primary",
  "Auxiliary",
  "Interface",
  "Control",
  "Monitor",
  "Sensor",
  "Actuator",
  "Processor",
  "Module",
  "System",
  "Network",
  "Channel",
  "Conduit",
  "Pathway",
  "Linkage",
  "Assembly",
  "Component",
  "Element",
  "Structure",
  "Matrix",
  "Array",
  "Node",
  "Driver",
  "Regulator",
  "Converter",
  "Generator",
  "Distributor",
  "Integrator",
  "Analyzer",
  "Transducer",
  "Emitter",
  "Collector",
  "Injector",
  "Stabiliser",
  "Calibrator",
  "Amplifier",
];

const measurements = [
  "Throughput",
  "Efficiency",
  "Capacity",
  "Utilization",
  "Output",
  "Input",
  "Load",
  "Stress",
  "Stability",
  "Performance",
  "Consumption",
  "Generation",
  "Transfer",
  "Storage",
  "Latency",
  "Signal",
  "Frequency",
  "Amplitude",
  "Velocity",
  "Pressure",
  "Temperature",
  "Density",
  "Integrity",
  "Alignment",
  "Calibration",
  "Activity",
  "Fluctuation",
  "Variance",
  "Deviation",
  "Threshold",
  "Resonance",
  "Saturation",
  "Optimization",
  "Degradation",
  "Progression",
  "Distribution",
  "Ratio",
  "Level",
  "Count",
  "Rate",
  "Index",
  "Metric",
  "Status",
  "Margin",
  "Surplus",
  "Deficit",
  "Potential",
  "Actual",
  "Projected",
];

export const generateText = (template: string): string => {
  return template
    .replace(/{{component}}/g, () => {
      const randomIndex = Math.floor(Math.random() * components.length);
      return components[randomIndex];
    })
    .replace(/{{measurement}}/g, () => {
      const randomIndex = Math.floor(Math.random() * measurements.length);
      return measurements[randomIndex];
    })
    .replace(/{{number}}/g, () => {
      const randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber < 10) {
        return `0${randomNumber}`;
      }
      return randomNumber.toString();
    });
};
