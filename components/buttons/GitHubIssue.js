import React from 'react'

export default function GitHubIssue() {
    return (
        <a className='bg-black text-white flex flex-row lg:w-6/12 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out py-2 rounded justify-center' href='https://github.com/asyncapi/website/issues/new?assignees=alequetzalli+-&labels=%F0%9F%93%91+docs&template=docs.yml&title=%5B%F0%9F%93%91+Docs%5D%3A+' target='_blank' rel='noopener noreferrer'>
            <img src='/img/logos/github-fill.svg' className='mr-2' />
            Create Issue on Github
        </a>
    )
}
