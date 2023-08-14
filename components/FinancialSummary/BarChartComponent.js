import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import ExpensesLink from '../../config/finance/json-data/2023/ExpensesLink.json'
import Expenses from '../../config/finance/json-data/2023/Expenses.json'

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
                <p>Click on the bar to know more</p>
            </div>
        );
    }
    return null;
};

const getUniqueCategories = () => {
    const allCategories = [];
    for (const month in Expenses) {
        Expenses[month].forEach(entry => {
            if (!allCategories.includes(entry.Category)) {
                allCategories.push(entry.Category);
            }
        });
    }
    return allCategories;
};

const months = Object.keys(Expenses);
const categories = getUniqueCategories();

const ExpensesTable = ({ expensesData }) => {
    // Function to total the amount for each category in a given month
    const calculateCategoryTotal = (month, category) => {
        const monthExpenses = expensesData[month];
        if (!monthExpenses) return 0;

        const categoryExpenses = monthExpenses.filter(entry => entry.Category === category);
        return categoryExpenses.reduce((total, entry) => total + parseFloat(entry.Amount), 0);
    };

    // Create a mapping of month and unique categories with their totals
    const monthCategoryTotals = {};
    Object.entries(expensesData).forEach(([month, entries]) => {
        monthCategoryTotals[month] = {};
        entries.forEach(entry => {
            if (!monthCategoryTotals[month][entry.Category]) {
                monthCategoryTotals[month][entry.Category] = parseFloat(entry.Amount);
            } else {
                monthCategoryTotals[month][entry.Category] += parseFloat(entry.Amount);
            }
        });
    });

    const openLink = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div className="expenses-table-container">
            <table className="expenses-table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(monthCategoryTotals).map(([month, categories]) =>
                        Object.entries(categories).map(([category, totalAmount], index) => (
                            <tr key={`${month}-${category}`}>
                                {index === 0 && <td rowSpan={Object.keys(categories).length}>{month}</td>}
                                <td><button onClick={(data) => {
                                    // Replace the URL with the external website URL you want to open
                                    const matchedLinkObject = ExpensesLink.find(obj => obj.category === category);
                                    if (matchedLinkObject) {
                                        // Extract the link from the matched object and open it in a new tab/window
                                        window.open(matchedLinkObject.link, '_blank');
                                    }
                                }}>{category}</button></td>
                                <td>${totalAmount.toFixed(2)}</td>
                            </tr>
                        ))
                    )}
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

const BarChartComponent = () => {
    // State for selected filters
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedMonth, setSelectedMonth] = useState("All Months");

    // Get unique categories and months from the Expenses data
    const categories = getUniqueCategories();
    const months = Object.keys(Expenses);

    // Filter the expenses data based on selectedCategory and selectedMonth
    const filteredData = Object.entries(Expenses).flatMap(([month, entries]) =>
        (selectedMonth === "All Months" || selectedMonth === month) ?
            entries.filter(entry =>
                selectedCategory === "All Categories" || entry.Category === selectedCategory
            )
            : []
    );

    // Calculate total amount for the filtered data
    const totalAmount = filteredData.reduce((total, entry) => total + parseFloat(entry.Amount), 0);

    const categoryAmounts = {};
    filteredData.forEach(entry => {
        if (categoryAmounts[entry.Category]) {
            categoryAmounts[entry.Category] += parseFloat(entry.Amount);
        } else {
            categoryAmounts[entry.Category] = parseFloat(entry.Amount);
        }
    });

    // Prepare chartData from the aggregated categoryAmounts
    const chartData = Object.keys(categoryAmounts).map(category => ({
        Category: category,
        Amount: categoryAmounts[category],
    }));

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
                    <h4 className="text-sm font-semibold mb-2 my-4">Total Expenses: ${totalAmount.toFixed(2)}</h4>
                    {/* Select for category filter */}
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        style={{ color: "gray", backgroundColor: "#f9f7f3", fontWeight: 600 }}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All Categories">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    {/* Select for month filter */}
                    <select
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        style={{ color: "gray", backgroundColor: "#f9f7f3", fontWeight: 600 }}
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="All Months">All Months</option>
                        {months.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>
                {/* Recharts BarChart */}
                <BarChart width={barWidth} height={barHeight} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis tickFormatter={(value) => `$${value}`}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        dataKey="Amount"
                        fill="rgba(123, 93, 211, 1)"
                        onClick={(data) => {
                            // Get the category from the clicked bar's payload
                            const category = data.payload.Category;
                            // Replace the URL with the external website URL you want to open
                            const matchedLinkObject = ExpensesLink.find(obj => obj.category === category);
                            if (matchedLinkObject) {
                                // Extract the link from the matched object and open it in a new tab/window
                                window.open(matchedLinkObject.link, '_blank');
                            }
                        }}
                    />
                </BarChart>
                {windowWidth < 900 ? (<ExpensesTable expensesData={Expenses} />) : null}
            </div>
        </div>
    );
};

export default BarChartComponent