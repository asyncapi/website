import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'


const cardsData = [
    {
        title: "Mentorship Program",
        body: "Our AsyncAPI Mentorship program offers paid guidance to develop valuable features, investing in tools and motivated individuals for community benefit.",
        image: "/img/finance/expense_1.webp",
    },
    {
        title: "Bounty Program",
        body: "Rewarding contributors regardless of affiliation or volunteer status. Free mentoring and support for newcomers to build portfolios and unlock tech prospects.",
        image: "/img/finance/expense_2.webp",
    },
    {
        title: "Events",
        body: "Supporting AsyncAPI conferences incurs costs for services and travel arrangements. Your contributions facilitate event hosting and community growth.",
        image: "/img/finance/expense_3.webp",
    },
    {
        title: "Swag Store",
        body: "Creating a swag store for seamless distribution to contributors, mentees, ambassadors, and community members. Store profits can fund complimentary swag expenses.",
        image: "/img/finance/expense_4.webp",
    },
    {
        title: "Hiring",
        body: (<p>To support our community, we require full time commitment. Open Collective helps us hire for AsyncAPI. <a style={{ textDecoration: "underline" }} href="https://www.linkedin.com/in/v-thulisile-sibanda/" target='_blank'>Thulie</a> joins as community manager, with plans to expand the team. our team</p>),
        image: "/img/finance/expense_5.webp",
    },
    {
        title: "Services",
        body: "Occasionally, we must pay for services such as Zoom or Descript, as they are not available through specific Open Source support programs.",
        image: "/img/finance/expense_6.webp",
    },
];

function Card({ title, body, image }) {
    return (
        <div className="bg-white rounded-md shadow-md p-4 flex items-center">
            <div style={{ color: "#212526" }}>
                <div className="flex flex-col items-center">
                    {image && <img src={image} alt={title} className="w-1/6 h-auto object-cover rounded-md m-1" />}
                    <h2 className="text-lg font-semibold my-1">{title}</h2>
                </div>
                <p className="text-sm" style={{ color: "#212526", fontSize: "16px" }}>{body}</p>
            </div>
        </div>
    );
}





function ExpenseBreakdown() {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16" style={{ backgroundColor: "#EFFAFE" }}>
                <div className="col-start-2 col-span-7 my-12">
                    <div id="expense">
                    <Heading level="h1" typeStyle="heading-md my-3 mx-3">
                        <h1 id="expense-breakdown" style={{ fontSize: '32px' }}>Expense Breakdown</h1>
                    </Heading>
                    <Paragraph typeStyle="body-md" className="my-3 max-w-4xl mx-auto" style={{ fontSize: '16px', color: '#212526', textAlign: 'center' }}>
                        Funds from GitHub Sponsors are directly transferred to our AsyncAPI Open
                        Collective account. We maintain transparency in all expenses, and the TSC approves
                        anticipated expenses.
                    </Paragraph>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 mx-3">
                        {cardsData.map((card, index) => (
                            <Card key={index} title={card.title} body={card.body} image={card.image} />
                        ))}
                    </div>
                </div>
            </div>
            <style>
                        {`
            @media (max-width: 768px) {
              #expense{
                margin-left:10px;
              }
            `}
            </style>
        </>
    )
}

export default ExpenseBreakdown