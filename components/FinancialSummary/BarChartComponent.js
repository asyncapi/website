import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const BarChartComponent = ({ data }) => {
    // State for selected filters
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedYearQuarter, setSelectedYearQuarter] = useState(null);

    // Prepare data for chart
    const categoryOptions = [...new Set(data.map((item) => item.Category))];

    // Generate all yearly quarters (Q1, Q2, Q3, Q4) based on data
    const yearQuarterOptions = [];
    data.forEach((item) => {
        const yearQuarter = `${item.Month} - ${item.Quater}`;
        if (!yearQuarterOptions.includes(yearQuarter)) {
            yearQuarterOptions.push(yearQuarter);
        }
    });

    // Filter data based on selected filters
    const filteredData = data.filter(
        (item) =>
            (!selectedCategory || item.Category === selectedCategory) &&
            (!selectedYearQuarter || `${item.Month} - ${item.Quater}` === selectedYearQuarter)
    );

    // Calculate total expenses for each category
    const totalExpensesByCategory = {};
    filteredData.forEach((item) => {
        totalExpensesByCategory[item.Category] =
            (totalExpensesByCategory[item.Category] || 0) + parseFloat(item.Amount);
    });

    // Prepare data for chart
    const chartData = Object.keys(totalExpensesByCategory).map((category) => ({
        Category: category,
        Amount: totalExpensesByCategory[category],
    }));

    const totalExpenses = Object.values(totalExpensesByCategory).reduce(
        (total, expense) => total + expense,
        0
    );

    const [windowWidth, setWindowWidth] = useState(null);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const barWidth = windowWidth < 900 ? null : 800;
    const barHeight = windowWidth < 900 ? null : 400;

    return (
        <div className="flex justify-center items-center mt-8">
            <div className="w-full lg:w-2/3 px-4 text-center">
                <div style={{ marginBottom: '20px' }}>
                    <h1 id="budget-analysis" className="text-4xl font-semibold mb-4 my-2">Budget Analysis</h1>
                    <p>Gain insights into the allocation of funds across different categories through our Budget Analysis</p>
                    <h4 className="text-sm font-semibold mb-2 my-4">Total Expenses: ${totalExpenses.toFixed(2)}</h4>
                    {/* Select for category filter */}
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        style={{ color: "gray", backgroundColor: "#f9f7f3", fontWeight: 600 }}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categoryOptions.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    {/* Select for year/quarter filter */}
                    <select
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        style={{ color: "gray", backgroundColor: "#f9f7f3", fontWeight: 600 }}
                        value={selectedYearQuarter}
                        onChange={(e) => setSelectedYearQuarter(e.target.value)}
                    >
                        <option value="">Total Yearly Expense</option>
                        {yearQuarterOptions.map((yearQuarter) => (
                            <option key={yearQuarter} value={yearQuarter}>
                                {yearQuarter}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Recharts BarChart */}
                <BarChart width={barWidth} height={barHeight} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    {windowWidth > 900 ? <XAxis dataKey="Category" /> : null}
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Amount" fill="rgba(123,93,211,1)" />
                </BarChart>
                <button
                    style={{ backgroundColor: "rgb(123,93,211)", color: "white", fontWeight: 700, borderRadius:"10px" }}
                    className="p-2 mt-6"
                >
                    <a
                        href="https://docs.google.com/spreadsheets/u/0/d/1zvhwNlBhf3A4NMIRzuhIaCS1uQkKT-DTCBbKogt8OBo/htmlview"
                        className="text-white font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here to know more
                    </a>
                </button>
            </div>
        </div>
    );
};

export default BarChartComponent