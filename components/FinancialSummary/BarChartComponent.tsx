import React, { useState, useEffect } from 'react';
import { BarChart, Bar, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ExpensesLinkData from '../../config/finance/json-data/2024/ExpensesLink.json';
import ExpensesData from '../../config/finance/json-data/2024/Expenses.json';
import { getUniqueCategories } from '../../utils/getUniqueCategories';
import { ExpenseItem, Expenses, ExpensesLinkItem, CustomTooltipProps } from '@/types/FinancialSummary/BarChartComponent';

/**
 * CustomTooltip component displays custom tooltip for BarChart.
 * @param {CustomTooltipProps} props - Props for CustomTooltip component.
 * @returns {JSX.Element} CustomTooltip component.
 */
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-opacity-90 bg-white border border-gray-300 p-2 shadow-md rounded-md">
                <p className="text-14 font-bold mb-1">{data.Category}</p>
                <p className="text-12 text-gray-900">${data.Amount.toFixed(2)}</p>
                <p>Click the bar to learn more</p>
            </div>
        );
    }

    return null;
};

/**
 * Card component displays expense details for a specific month.
 * @param {Object} props - Props for Card component.
 * @param {string} props.month - Month for which expenses are displayed.
 * @param {ExpenseItem[]} props.data - Expense data for the month.
 * @returns {JSX.Element} Card component.
 */
const Card: React.FC<{ month: keyof Expenses; data: ExpenseItem[]; }> = ({ month, data }) => {
    return (
        <div className="bg-slate-100 shadow-lg rounded-lg p-4 flex flex-col h-56 overflow-hidden">
            <div className="text-lg font-semibold mb-4">{month}</div>
            <div className="flex flex-col overflow-x-auto overflow-y-auto">
                {data.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <div className="text-sm m-2" onClick={() => {
                            const category = item.Category;
                            const matchedLinkObject = ExpensesLinkData.find(obj => obj.category === category);
                            if (matchedLinkObject) {
                                window.open(matchedLinkObject.link, '_blank');
                            }
                        }}>{item.Category}</div>
                        <div className="text-sm m-2">${item.Amount}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * ExpensesCard component displays all expenses for each month.
 * @returns {JSX.Element} ExpensesCard component.
 */
const ExpensesCard: React.FC = () => {
    return (
        <div className="overflow-x-auto">
            <div className="grid grid-flow-col auto-cols-max gap-4 p-4">
                {Object.entries(ExpensesData).map(([month, data], index) => (
                    <Card key={index} month={month as keyof Expenses} data={data} />
                ))}
            </div>
        </div>
    );
};

/**
 * BarChartComponent component displays a bar chart for expense analysis.
 * @returns {JSX.Element} BarChartComponent component.
 */
const BarChartComponent: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
    const [selectedMonth, setSelectedMonth] = useState<string>("All Months");
    const [windowWidth, setWindowWidth] = useState<number>(0);

    const categories: string[] = getUniqueCategories();
    const months: string[] = Object.keys(ExpensesData);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const filteredData: ExpenseItem[] = Object.entries(ExpensesData).flatMap(([month, entries]) =>
        (selectedMonth === "All Months" || selectedMonth === month) ?
            entries.filter(entry =>
                selectedCategory === "All Categories" || entry.Category === selectedCategory
            )
            : []
    );

    const totalAmount: number = filteredData.reduce((total, entry) => total + parseFloat(entry.Amount), 0);

    const categoryAmounts: { [category: string]: number } = {};
    filteredData.forEach(entry => {
        if (categoryAmounts[entry.Category]) {
            categoryAmounts[entry.Category] += parseFloat(entry.Amount);
        } else {
            categoryAmounts[entry.Category] = parseFloat(entry.Amount);
        }
    });

    const chartData: { Category: string; Amount: number }[] = Object.keys(categoryAmounts).map(category => ({
        Category: category,
        Amount: categoryAmounts[category],
    }));

    const barWidth: number | undefined = windowWidth && windowWidth < 900 ? undefined : 800;
    const barHeight: number | undefined = windowWidth && windowWidth < 900 ? undefined : 400;

    return (
        <div className="flex justify-center items-center sm:px-6 lg:px-8 mt-8">
            <div className="w-full lg:w-2/3 px-4 text-center">
                <div className='mb-5'>
                    <h1 id="budget-analysis" className="text-3xl font-semibold mb-4 my-2">Budget Analysis</h1>
                    <p>Gain insights into the allocation of funds across different categories through our Budget Analysis</p>
                    <div className="flex flex-col md:flex-row justify-between my-4 md:items-center md:justify-between md:m-8">
                        <div className="my-2">
                            <p className="text-center sm:text-left">Expenses</p>
                            <p className="text-center sm:text-left mt-1 text-xl font-semibold">${totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="md:flex space-x-4">
                            <div className="mx-auto">
                                <select
                                    className="p-2 m-1 border text-gray-600 font-semibold border-gray-600 rounded-md bg-white text-violet text-xs w-full sm:w-auto md:w-48"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="All Categories">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <select
                                    className="p-2 m-1 pr-8 border border-gray-600 rounded-md bg-violet text-white font-semibold text-xs w-full sm:w-auto md:w-48"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    <option value="All Months">All Months</option>
                                    {months.map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <BarChart width={barWidth} height={barHeight} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis tickFormatter={(value) => `$${value}`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                            dataKey="Amount"
                            fill="#7B5DD3FF"
                            onClick={(data) => {
                                const category = data.payload.Category;
                                const matchedLinkObject: ExpensesLinkItem | undefined = ExpensesLinkData.find(obj => obj.category === category);
                                if (matchedLinkObject) {
                                    window.open(matchedLinkObject.link, '_blank');
                                }
                            }}
                        />
                    </BarChart>
                </div>
                {windowWidth && windowWidth < 900 ? <ExpensesCard /> : null}
            </div>
        </div>
    );
};

export default BarChartComponent;
