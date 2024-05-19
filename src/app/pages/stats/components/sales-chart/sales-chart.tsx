import { Chart } from "react-chartjs-2";
import { StatsData } from "../../types";
import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-moment";
ChartJS.register(...registerables);

type Props = {
  data: StatsData[];
};

export const SalesChart = ({ data }: Props) => {
  return (
    <Chart
      data={{
        xLabels: [],
        datasets: [
          {
            label: "Sold per day",
            data: data.map((d) => ({ x: new Date(d.date), y: d.count })),
          },
        ],
      }}
      type="bar"
      options={{
        scales: {
          x: {
            type: "time",
            min: Date.now() - 3600 * 1000 * 24 * 30,
            max: Date.now(),
            position: "bottom",
            time: {
              displayFormats: { day: "DD/MM" },
              tooltipFormat: "DD/MM/YY",
              unit: "day",
            },
          },
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      }}
    />
  );
};
