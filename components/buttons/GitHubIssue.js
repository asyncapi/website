import React from 'react'

export default function GitHubIssue({className=''}) {
    return (
        <a className={`bg-black text-white flex flex-row lg:w-6/12 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out py-2 rounded justify-center ${className}`} href='https://github.com/asyncapi/website/issues/new?assignees=alequetzalli+-&labels=%F0%9F%93%91+docs&template=docs.yml&title=%5B%F0%9F%93%91+Docs%5D%3A+' target='_blank' rel='noopener noreferrer' data-testid="GithubIssue-Link">
            <img src='/img/logos/github-fill.svg' className='mr-2' alt="Github:AsyncAPI" />
            Create Issue on GitHub
        </a>
    )
}
