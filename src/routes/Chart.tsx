import { useQuery } from "react-query"; 
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "./atoms";
import {useRecoilValue} from "recoil"

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({coinId} : ChartProps) {
  const isDark = useRecoilValue(isDarkAtom)
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
  return (
  <div>
  {isLoading ? (
    "Loading chart..."
  ) : (
    <ApexChart
      type="line"
      series={[
        {
          name: "Price",
          data: data?.map((price) => parseFloat(price.close)) ?? []
        },
      ]}
      options={{
        theme: {
          mode: isDark ? "dark" : "light",
        },
        chart: {
          height: 300,
          width: 500,
          toolbar: {
            show: false,
          },
          background: "transparent",
        },
        grid: { show: false },
        stroke: {
          curve: "smooth",
          width: 4,
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          categories: data?.map((date) => {const time = new Date(date.time_close * 1000)
            return time.toLocaleDateString();
          }
           ),
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: { show: false },
        },
        fill: {
          type: "gradient",
          gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
        },
        colors: ["red"],
        tooltip: {
          y: {formatter: (value) => `$${value.toFixed(2)}`},
        }

      }}
    />
  )}
</div>
  );
}

export default Chart;