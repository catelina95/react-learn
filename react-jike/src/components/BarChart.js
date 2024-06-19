import { useRef, useEffect } from "react";
import * as echarts from "echarts";

const BarChart = ({ title }) => {
  const chartRef = useRef(null);
  const drawChart = () => {
    let myChart = {};
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);

      const option = {
        title: {
          text: title,
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };

      option && myChart.setOption(option);
    }
    return myChart;
  };

  useEffect(() => {
    // useEffect 里可保证 DOM 可用
    const myChart = drawChart();
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div>
      <div ref={chartRef} style={{ width: "800px", height: "400px" }}></div>
    </div>
  );
};

export default BarChart;
