import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

const MyGanttChart = ({ tasks }) => {
  const chartRef = useRef(null);

  const getChartData = () => {
    let lastDepartment = null;
    const labels = [];
    const data = [];
    const backgroundColors = [];
    const borderColors = [];
    
    tasks.forEach(task => {
      if (lastDepartment !== task.department) {
        labels.push(task.department); // 部門標題
        data.push([null, null]); // 空數據點作為分隔
        backgroundColors.push('rgba(217, 217, 217, 1)'); // 淺灰色背景顯示部門標題
        borderColors.push('rgba(0, 0, 0, 0)'); // 透明邊框
        lastDepartment = task.department;
      }
      labels.push(task.name);
      const startDate = new Date(task.start);
      const endDate = task.end ? new Date(task.end) : new Date();
      data.push([startDate.getTime(), endDate.getTime()]);
      backgroundColors.push(task.color);
      borderColors.push('rgba(0, 0, 0, 1)'); // 黑色邊框
    });
  
    return {
      labels,
      datasets: [{
        label: '任務持續時間',
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }]
    };
  };
  

  // 計算時間範圍
  const timeRange = tasks.reduce((acc, task) => {
    const start = new Date(task.start).getTime();
    const end = task.end ? new Date(task.end).getTime() : new Date().getTime();
    acc.min = acc.min ? Math.min(acc.min, start) : start;
    acc.max = acc.max ? Math.max(acc.max, end) : end;
    return acc;
  }, {});

  const options = {
    responsive: true, // 確保圖表是響應式的
    maintainAspectRatio: true, // 不維持原始的寬高比
    indexAxis: 'y',
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy/MM/dd',
          displayFormats: {
            day: 'yyyy/MM/dd'
          }
        },
        title: {
          display: true,
          text: '日期'
        },
        min: new Date(timeRange.min),  // 最小日期範圍
        max: new Date(timeRange.max)   // 最大日期範圍
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '項目'
        },
        barThickness: 20, // 控制項目的高度
        categoryPercentage: 0.6, // 控制類別（行）的高度百分比
        barPercentage: 0.9 // 控制條形的寬度百分比
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const startDate = new Date(tooltipItem.raw[0]);
            const endDate = new Date(tooltipItem.raw[1]);
            return `${tooltipItem.dataset.label}: ${tooltipItem.label} (${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`;
          }
        }
      }
    }
  };

  useEffect(() => {
    const chart = new Chart(chartRef.current.getContext('2d'), {
      type: 'bar',
      data: getChartData(),
      options: options
    });

    return () => chart.destroy();
  }, [tasks]);

  return <canvas ref={chartRef}></canvas>;
};

const tasks = [
    { name: '建立訂單', department: '業務', start: '2023/04/01', end: '2023/04/02', color: 'rgba(255, 99, 132, 0.2)' },
    { name: '完成拋轉', department: '業務', start: '2023/04/02', end: '2023/04/0', color: 'rgba(255, 99, 132, 0.2)' },
    { name: '工單開立', department: '生物管', start: '2023/04/05', end: '2023/04/09', color: 'rgba(54, 162, 235, 0.2)' },
    { name: '生產指示書', department: '生物管', start: '2023/04/09', end: '2023/04/14', color: 'rgba(54, 162, 235, 0.2)' },
    { name: 'ＰＯ：簽核中', department: '採購', start: '2023/04/16', end: '2023/04/19', color: 'rgba(75, 192, 192, 0.2)' },
    { name: 'ＰＯ：待收貨', department: '採購', start: '2023/04/22', end: '2023/04/30', color: 'rgba(75, 192, 192, 0.2)' }
  ];
  

export default function App() {
  return (
    <div>
      <h1>甘特圖示例</h1>
      
        <div className="container">
        <div className="row">
            <div className="col-md-12">
                 <MyGanttChart tasks={tasks} />
            </div>
        </div>
        </div>
    </div>
  );
}
