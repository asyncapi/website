import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import ExpensesLink from './ExpensesLinkObject'
import Expenses from './ExpenseObject';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const tooltipStyle = {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #ccc',
            padding: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
        };
        const labelStyle = {
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '5px',
        };
        const amountStyle = {
            fontSize: '12px',
            color: '#555',
        };

        return (
            <div className="custom-tooltip" style={tooltipStyle}>
                <p className="tooltip-label" style={labelStyle}>{data.Category}</p>
                <p className="tooltip-amount" style={amountStyle}>${data.Amount.toFixed(2)}</p>
            </div>
        );
    }
    return null;
};

const ExpensesTable = () => {
    const uniqueMonths = [...new Set(Expenses.map(item => item.Month))];
    const uniqueCategories = [...new Set(Expenses.map(item => item.Category))];

    return (
        <div className="expenses-table-container">
            <table className="expenses-table">
                <thead>
                    <tr>
                        <th className="empty-cell"></th>
                        {uniqueCategories.map(category => (
                            <th key={category} className="category-cell">
                                {category}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {uniqueMonths.map(month => (
                        <tr key={month}>
                            <td className="month-cell">{month}</td>
                            {uniqueCategories.map(category => {
                                const matchingExpense = Expenses.find(
                                    item => item.Month === month && item.Category === category
                                );
                                return (
                                    <td key={`${month}-${category}`} className="expense-cell">
                                        {matchingExpense ? `$${matchingExpense.Amount}` : '-'}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <style>{`
            .expenses-table-container {
                max-width: 800px;
                margin: 0 auto;
                overflow-x: auto;
            }
            
            .expenses-table {
                border-collapse: collapse;
                width: 100%;
            }
            
            .expenses-table th,
            .expenses-table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: center;
            }
            
            .expenses-table th {
                background-color: #f2f2f2;
            }
            
            .expenses-table th.empty-cell,
            .expenses-table td.month-cell {
                background-color: #e0e0e0;
                font-weight: bold;
            }
            
            .expenses-table td.expense-cell {
                color: #333;
            }
            
            .expenses-table td.expense-cell:hover {
                background-color: #f7f7f7;
            }
            
            `}</style>
        </div>
    );
};

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
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        dataKey="Amount"
                        fill="rgba(123,93,211,1)"
                        onClick={(data) => {
                            // Get the category from the clicked bar's payload
                            const category = data.payload.Category;
                            // Replace the URL with the external website URL you want to open
                            const matchedLinkObject = ExpensesLink.find(obj => obj.category === category)
                            if (matchedLinkObject) {
                                // Extract the link from the matched object and open it in a new tab/window
                                window.open(matchedLinkObject.link, '_blank');
                            };
                        }}
                    />
                </BarChart>
                {windowWidth < 900 ? (<ExpensesTable expenses={Expenses} />) :null}
            </div>
        </div>
    );
};

export default BarChartComponent