import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface LineChartProps {
  data: number[];
  labels: string[];
  className?: string;
}

export function LineChart({ data, labels, className }: LineChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        fill: false,
        data: data,
        borderColor: 'rgb(59, 130, 246)', // Blue-500
        backgroundColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 8,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: 'rgb(59, 130, 246)',
        pointHoverBorderColor: 'rgb(255, 255, 255)',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgb(255, 255, 255)',
        titleColor: 'rgb(17, 24, 39)', // Gray-900
        bodyColor: 'rgb(17, 24, 39)',
        borderColor: 'rgb(229, 231, 235)', // Gray-200
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        callbacks: {
          title: () => '',
          label: (context: any) => `${context.parsed.y}`,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: 'Inter',
          },
          color: 'rgb(107, 114, 128)', // Gray-500
          padding: 8,
        },
      },
      y: {
        display: true,
        position: 'right' as const,
        grid: {
          color: 'rgb(243, 244, 246)', // Gray-100
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: 'Inter',
          },
          color: 'rgb(107, 114, 128)', // Gray-500
          padding: 8,
        },
      },
    },
  };

  return (
    <div className={className}>
      <Line data={chartData} options={options} />
    </div>
  );
} 