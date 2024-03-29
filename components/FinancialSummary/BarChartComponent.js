import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { getUniqueCategories } from '../../lib/getUniqueCategories';
/**
 * CustomTooltip component for the bar chart. Displays additional information on hover.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.active - Indicates if the tooltip is active.
 * @param {Object[]} props.payload - An array of data points.
 * @returns {JSX.Element} The rendered CustomTooltip component.
 */
const CustomTooltip = ({ active, payload }) => {
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
 * @type {string}
 * This variable stores the current year
 */
const currentYear = String(new Date().getFullYear());

/**
 * Card component displays monthly expense data.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.month - The month for which expenses are displayed.
 * @param {Object[]} props.data - The expense data for the month.
 * @param {Object[]} props.links - Links to additional information for each category.
 * @returns {JSX.Element} The rendered Card component.
 */

const Card = ({ month, data, links }) => {
	return (
		<div className="bg-slate-100 shadow-lg rounded-lg p-4 flex flex-col h-56 overflow-hidden">
			<div className="text-lg font-semibold mb-4">{month}</div>
			<div className="flex flex-col overflow-x-auto overflow-y-auto">
				{data.map((item, index) => (
					<div key={index} className="flex justify-between">
						<div className="text-sm m-2" onClick={(e) => {
							const category = item.Category;
							const matchedLinkObject = links.find(obj => obj.category === category);
							if (matchedLinkObject) {
								window.open(matchedLinkObject.link, '_blank');
							}
						}}>
							{item.Category}
						</div>
						<div className="text-sm m-2">${item.Amount}</div>
					</div>
				))}
			</div>
		</div>
	);
};

/**
 * ExpensesCard component displays a grid of expense cards for each month.
 * @param {Object} props - The component's props.
 * @param {any[]} props.Expenses - The month for which expenses are displayed.
 * @param {any[]} props.ExpensesLinks
 * @returns {JSX.Element} The rendered ExpensesCard component.
 */
const ExpensesCard = ({ Expenses, ExpensesLinks }) => {
	return (
		<div className="overflow-x-auto">
			<div className="grid grid-flow-col auto-cols-max gap-4 p-4">
				{Object.keys(Expenses).map((month, index) => (
					<Card key={index} month={month} data={Expenses[month]} links={ExpensesLinks} />
				))}
			</div>
		</div>
	);
};

/**
 * BarChartComponent displays a budget analysis bar chart with filtering options.
 *
 * @returns {JSX.Element} The rendered BarChartComponent component.
 */
const BarChartComponent = () => {
	// State for selected filters
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [selectedMonth, setSelectedMonth] = useState("All Months");
	const [windowWidth, setWindowWidth] = useState(null);

	const [Expenses, setExpenses] = useState([]);
	const [ExpensesLink, setExpensesLink] = useState(null);



	// Get unique categories and months from the Expenses data
	const categories = useMemo(() => getUniqueCategories(Expenses), [Expenses]);
	const months = useMemo(() => Object.keys(Expenses), [Expenses]);

	// Filter the expenses data based on selectedCategory and selectedMonth
	const filteredData = useMemo(() => Object.entries(Expenses).flatMap(([month, entries]) =>
		(selectedMonth === "All Months" || selectedMonth === month) ?
			entries.filter(entry =>
				selectedCategory === "All Categories" || entry.Category === selectedCategory
			)
			: []
	), [selectedCategory, selectedMonth, Expenses]);

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

	// Create a ref for the handleResize function
	const handleResizeRef = useRef(null);

	// Define the handleResize function
	handleResizeRef.current = () => {
		setWindowWidth(window.innerWidth);
	};

	// Update the window width when the component mounts and when the window is resized
	useEffect(() => {
		// Initial width
		handleResizeRef.current();

		// Listen for window resize events
		window.addEventListener("resize", handleResizeRef.current);

		const importComponents = async () => {
			const Expenses = await import(`../../config/finance/json-data/${currentYear}/Expenses.json`);
			const ExpensesLink = await import(`../../config/finance/json-data/${currentYear}/ExpensesLink.json`);
			setExpenses(Expenses.default);
			setExpensesLink(ExpensesLink.default);
		}
		importComponents();


		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResizeRef.current);
		};
	}, []);

	const barWidth = windowWidth < 900 ? null : 800;
	const barHeight = windowWidth < 900 ? null : 400;

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
								{/* Select for category filter */}
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

								{/* Select for month filter */}
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
				{/* Recharts BarChart */}
				<div className='flex justify-center'>
					<BarChart width={barWidth} height={barHeight} data={chartData}>
						<CartesianGrid strokeDasharray="3 3" />
						<YAxis tickFormatter={(value) => `$${value}`} />
						<Tooltip content={<CustomTooltip />} />
						<Legend />

						{
							ExpensesLink &&
							<Bar
								dataKey="Amount"
								fill="#7B5DD3FF"
								onClick={(data) => {
									// Get the category from the clicked bar's payload
									const category = data.payload.Category;
									console.log(ExpensesLink);
									// Replace the URL with the external website URL you want to open
									const matchedLinkObject = ExpensesLink.find(obj => obj.category === category);
									if (matchedLinkObject) {
										// Extract the link from the matched object and open it in a new tab/window
										window.open(matchedLinkObject.link, '_blank');
									}
								}}
							/>
						}

					</BarChart>
				</div>
				{windowWidth < 900 ? Expenses && ExpensesLink && <ExpensesCard Expenses={Expenses} ExpensesLinks={ExpensesLink} /> : null}
			</div>
		</div>
	);
};

export default BarChartComponent;