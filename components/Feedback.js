import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import GitHubIssue from "./buttons/GitHubIssue";

export default function Feedback(className = '') {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [feedback, setFeedback] = useState('');
    const { asPath, pathname } = useRouter();
    
    useEffect(() => {
        setSubmitted(false);
        setError(false);
    }, [asPath])

    const date_stamp = new Date()
    const time_stamp = date_stamp.toUTCString();
    
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            title: `Feedback on ${asPath} - ${time_stamp}`,
            feedback: feedback
        }

        fetch("/.netlify/functions/github_discussions", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            
            if (response.status === 200) {
                setSubmitted(true);
            }
            if(response.status !== 200) {
                setError(true);
            }
            response.json();
            console.log(response);
        }).then(data =>{
            console.log(data);
        })
    }

    if (submitted) {
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
    if(error){
        return (
            <div className={`flex flex-col rounded-md shadow-md text-center border border-gray-200 p-4 ${className}`}>
            <div className='block mx-auto w-fit'>
                <img src='/img/illustrations/icons/icon-x.svg' className='md:w-14' />
            </div>
            <div className='text-center mx-auto text-lg mt-4'>
                Oops! Something went wrong...
            </div>
            <div className='text-center mx-auto text-md text-gray-500'>
                We were unable to process your feedback
            </div>
            <GitHubIssue className="mx-auto" />
        </div>
        );
    }
    return (
        <div className={`flex flex-col rounded-md shadow-md border border-gray-200 p-4 ${className}`}>
            <div className='flex flex-row'>
                <img src="/img/illustrations/icons/icon.svg" className='w-28 md:w-14' />
                <div className='flex flex-col ml-4'>
                    <div className='text-xl'>
                        Was this helpful?
                    </div>
                    <div className='text-sm text-gray-500'>
                        Help us improve the docs by adding your contribution.
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col my-4'>
                    <textarea className='w-full h-20 border rounded-md bg-gray-50 text-sm px-2 py-1 text-gray-700 inline-block align-top focus:border-0' placeholder='Write your suggestions here' onChange={(e) => setFeedback(e.target.value)} required />
                    <div className='block lg:flex lg:flex-row mt-4 text-sm'>
                        <button className='bg-primary-500 text-white w-full lg:w-6/12 py-2 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out rounded' type='submit'>Submit feedback</button>
                        <div className='my-2 text-center font-medium w-full lg:w-1/12 lg:my-auto'>OR</div>
                        <GitHubIssue />
                    </div>
                </div>
            </form>
        </div>
    )
}
