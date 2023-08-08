import Container from '../layout/Container'
import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'


const cardsData = [
    {
        title: "fffef",
        body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
        image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
    },
    {
        title: "fwfwfc",
        body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
        image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
    },
    {
        title: "khjhb",
        body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9",
        image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
    },
    {
        title: "fugv",
        body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy fdwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy fdwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
        image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
    },
    {
        title: "veuvei",
        body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
        image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
    },
    {
        title: "egef",
        body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
        image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
    },
];

function Card({ title, body, image }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            {image && <img src={image} alt={title} className="w-full h-32 object-cover rounded-md mb-4" />}
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{body}</p>
        </div>
    );
}

function ExpenseBreakdown() {
    return (
        <Container wide>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16" style={{ backgroundColor: "#EFFAFE" }}>
                <div className="col-start-2 col-span-7 my-12">
                    <Heading level="h1" typeStyle="heading-md" className="my-3 mx-3">Expense Breakdown</Heading>
                    <Paragraph typeStyle="body-md" className="my-3 max-w-4xl mx-3">
                        Funds from GitHub Sponsors are directly transferred to our AsyncAPI Open
                        Collective account. We maintain transparency in all expenses, and the TSC approves
                        anticipated expenses.
                    </Paragraph>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mx-3">
                        {cardsData.map((card, index) => (
                            <Card key={index} title={card.title} body={card.body} image={card.image} />
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ExpenseBreakdown