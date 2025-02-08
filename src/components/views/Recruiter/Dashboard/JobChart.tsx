import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

// const data = [
//     {
//         name: "Product Designer",
//         pv: 180,
//     },
//     {
//         name: "Sales Manager",
//         pv: 150,
//     },
//     {
//         name: "Java Developer",
//         pv: 170,
//     },
//     {
//         name: "HR Administration",
//         pv: 140,
//     },
//     {
//         name: "Graphic Designer",
//         pv: 60,
//     },
//     {
//         name: "Motion Designer",
//         uv: 320,
//         pv: 80,
//     }
// ];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
        return (
            <div className="bg-[#312E81] shadow-md rounded p-2 flex justify-start items-center">
                <p className="text-sm text-[#A5B4FC] mr-2">{label}</p>
                <p className="text-sm text-white">{payload?.[0]?.value}</p>
            </div>
        );
    }

    return null;
};


const JobChart = ({ companyDetails }: any) => {
    console.log("companyDetails-->", companyDetails);

    const [chartData, setChartData] = useState([]);
    const [titles, setTitles] = useState<any>([]);

    useEffect(() => {
        const allTitles: any = [];
        const arr: any = [...chartData];
        companyDetails && companyDetails?.length && companyDetails?.[0]?.jobs?.map((job: any, i: any) => {       
            if (allTitles.includes(job?.title)) {
                const index = allTitles.indexOf(job?.title)
                arr[index] = {
                    name: arr[index].name,
                    pv:  arr[index].pv + 1 
                }
            } else {
                arr.push({
                    name: job?.title,
                    pv: 1
                })
            }
            !allTitles.includes(job?.title) && allTitles.push(job?.title)
            setChartData(arr);
            setTitles(allTitles)
        })
    }, [companyDetails])
    console.log("chartData-->", chartData);
    console.log("titles-->", titles);

    return (
        <div className="mb-16 p-10 bg-[#EEF2FF] rounded-xl flex justify-center items-center flex-col">
            <div className="mb-8 flex justify-between items-center w-full">
                <h1 className="text-xl font-bold">Applications received for latest jobs posted</h1>
                <div className="flex justify-end items-center">
                    <div className=" flex justify-center items-center"><span className="bg-[#E0E7FF] w-2 h-2 block rounded-full mr-1"></span><span className="text-xs text-[#475569] mr-2">Total Applications</span></div>
                    <div className=" flex justify-center items-center"><span className="bg-[#9546E5] w-2 h-2 block rounded-full mr-1"></span><span className="text-xs text-[#475569]">Applications Reviewed</span></div>
                </div>
            </div>
            <BarChart
                width={800}
                height={300}
                data={chartData}
                barSize={18}
                margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
            >
                <XAxis dataKey="name" tick={{ fontSize: 12 }} scale="point" padding={{ left: 80, right: 80 }} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 50]} />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid vertical={false} style={{ stroke: "#E2E8F0" }} />
                <Bar
                    dataKey="pv"
                    fill="#9646E5"
                    background={{ fill: "#E0E7FF" }}
                    radius={[10, 10, 0, 0]}
                />
            </BarChart>
        </div>
    );
}
export default JobChart;