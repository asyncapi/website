import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import ExpensesLink from '../../config/finance/json-data/2023/ExpensesLink.json'
import Expenses from '../../config/finance/json-data/2023/Expenses.json'

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-opacity-90 bg-white border border-gray-300 p-2 shadow-md rounded-md">
                <p className="text-14 font-bold mb-1">{data.Category}</p>
                <p className="text-12 text-gray-900">${data.Amount.toFixed(2)}</p>
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



const Card = ({ month, data }) => {
  return (
    <div className="bg-slate-100 shadow-lg rounded-lg p-4 flex flex-col justify-between h-52 overflow-hidden">
      <div className="text-lg font-semibold mb-4">{month}</div>
      <div className="flex flex-col justify-center overflow-x-auto">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between">
            <div className="text-sm m-2">{item.Category}</div>
            <div className="text-sm m-2">${item.Amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExpensesCard = () => {
    return (
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-max gap-4 p-4">
          {Object.keys(Expenses).map((month, index) => (
            <Card key={index} month={month} data={Expenses[month]} />
          ))}
        </div>
      </div>
    );
  };

const BarChartComponent = () => {
    // State for selected filters
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedMonth, setSelectedMonth] = useState("All Months");
    const [windowWidth, setWindowWidth] = useState(null);

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


    const barWidth = windowWidth < 900 ? null : 800;
    const barHeight = windowWidth < 900 ? null : 400;

    return (
        <div className="flex justify-center items-center mt-8">
            <div className="w-full lg:w-2/3 px-4 text-center">
                <div className='mb-5'>
                    <h1 id="budget-analysis" className="text-4xl font-semibold mb-4 my-2">Budget Analysis</h1>
                    <p>Gain insights into the allocation of funds across different categories through our Budget Analysis</p>
                    <h4 className="text-sm font-semibold mb-2 my-4">Total Expenses: ${totalAmount.toFixed(2)}</h4>
                    {/* Select for category filter */}
                    <select
                        className="w-full p-2 border text-gray-600 font-semibold border-gray-300 rounded-md bg-[#f9f7f3]"
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
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md text-gray-600 bg-[#f9f7f3] font-semibold"
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
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        dataKey="Amount"
                        fill="#7B5DD3FF"
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
                {windowWidth < 900 ? <ExpensesCard data={Expenses} /> : null}
            </div>
        </div>
    );
};

export default BarChartComponent