import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const DonutChart = ({ x, y, textoX, textoY }: { x: any; y: any, textoX: string, textoY: string }) => {
    const data = {
        labels: [textoX, textoY],
        datasets: [
            {
                data: [x, y],
                backgroundColor: ['#d94014', '#f2b00f'],
                borderColor: ['#d94014', '#f2b00f'],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                    color: '#333',
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#fff',
                borderWidth: 1,
                padding: 10,
            },
        },
        cutout: '50%',
        elements: {
            arc: {
                borderWidth: 2,
            },
        },
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-lg">
            <div className='max-w-[300px] mx-auto bg-white p-4'>
                <h2 className="text-lg font-semibold text-center mb-4 text-gray-800">Status dos Pedidos</h2>
                <div className="flex justify-center items-center">
                    <Doughnut data={data} options={options} height={200} width={200} />
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>{textoX}: {x}</p>
                    <p>{textoY}: {y}</p>
                </div>
            </div>
        </div>
    );
};

export default DonutChart;
