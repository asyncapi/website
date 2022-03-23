import { useState } from "react";
import { useRouter } from "next/router";

export default function Feedback(className = '') {
    const [Submit, setSubmit] = useState(false);
    const [feedback, setFeedback] = useState('')
    const date_stamp = new Date()
    const time_stamp = date_stamp.getDate().toString() + '/' + (date_stamp.getMonth()+1).toString() + '/' + date_stamp.getFullYear().toString() + ' ' + date_stamp.getHours().toString() + ':' + date_stamp.getMinutes().toString() + ':' + date_stamp.getSeconds().toString();
    const { asPath, pathname } = useRouter();
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            title: 'Feedback on ' + asPath + ' - ' + time_stamp,
            feedback: feedback
        }

        const response = await fetch("../api/sheet", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                setSubmit(true);
                setTimeout(() => {
                    setSubmit(false);
                }, 5000);
            }
        })
    }

    if (Submit) {
        return (
            <div className={`flex flex-col rounded-md shadow-md text-center border border-gray-200 p-4 ${className}`}>
                <div className='block mx-auto w-fit'>
                    <img src='/img/illustrations/icons/icon-check.svg' className='md:w-14' />
                </div>
                <div className='text-center mx-auto text-lg mt-4'>
                    Thank you for your feedback!
                </div>
                <div className='text-center mx-auto text-md text-gray-500'>
                    Your contribution has been received and we couldn't be happier.
                </div>
                <a href='https://github.com/asyncapi/website' target='_blank' rel='noopener noreferrer' className="w-full shadow-md hover:shadow-lg transition-all duration-500 bg-black ease-in-out py-2 px-2 rounded-md mx-auto mt-4 md:w-1/2">
                    <div className='text-white flex flex-row justify-center text-center'>
                        <img src='/img/logos/github-fill.svg' className='w-6 mr-2' />
                        Follow on GitHub
                    </div>
                </a>
            </div>
        )
    }
    return (
        <div className={`flex flex-col rounded-md shadow-md border border-gray-200 p-4 ${className}`}>
            <div className='flex flex-row'>
                <img src="/img/illustrations/icons/icon.svg" className='w-28 md:w-14' />
                <div className='flex flex-col ml-4'>
                    <div className='text-xl'>
                        Was this Helpful?
                    </div>
                    <div className='text-sm text-gray-500'>
                        Help us improve the docs by adding your contribution.
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col my-4'>
                    <textarea className='w-full h-20 border rounded-md bg-gray-50 text-sm px-2 py-1 text-gray-700 inline-block align-top focus:border-0' placeholder='Write your suggestions here' onChange={(e) => setFeedback(e.target.value)} />
                    <div className='block lg:flex lg:flex-row mt-4 text-sm'>
                        <button className='bg-primary-500 text-white w-full lg:w-6/12 py-2 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out rounded' type='submit'>Submit feedback</button>
                        <div className='my-2 text-center font-medium w-full lg:w-1/12 lg:my-auto'>OR</div>
                        <a className='bg-black text-white flex flex-row lg:w-6/12 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out py-2 rounded' href='https://github.com/asyncapi/website/issues/new?assignees=alequetzalli+-&labels=%F0%9F%93%91+docs&template=docs.yml&title=%5B%F0%9F%93%91+Docs%5D%3A+' target='_blank' rel='noopener noreferrer'>
                            <div className='mx-auto text-center w-fit'>
                                Create Issue on Github
                            </div>
                        </a>
                    </div>
                </div>
            </form>
        </div>
    )
}
