import React from 'react'

const Footer = () => {
    return (
        <div className='p-10 bg-red-50 mt-5 shadow-2xl'>
            <div className='flex max-md:flex-col gap-10 border-b pb-5'>
                <div className='w-full space-y-5'>
                    <h1 className='text-2xl font-bold'>shopZap</h1>
                    <p>send short experience feedback here.</p>
                    <div className='flex border w-1/2 max-sm:w-full'>
                        <input type="text" className='w-full outline-0 px-3' placeholder='eg : good | bad | better | excelent'/>
                        <button className='bg-red-200 hover:bg-red-400 px-3 py-2'>send</button>
                    </div>
                </div>
                <div className='w-full grid grid-cols-3 max-sm:grid-cols-2 gap-5'>
                    <div>
                        <ul className='flex flex-col gap-3'>
                            <li className='font-bold'>Community</li>
                            <li>About</li>
                            <li>Github repo</li>
                            <li>Portfolio</li>
                        </ul>
                    </div>
                    <div>
                        <ul className='flex flex-col gap-3'>
                            <li className='font-bold'>Getting started</li>
                            <li>Home</li>
                            <li>Collections</li>
                            <li>About</li>
                        </ul>
                    </div>
                    <div>
                        <ul className='flex flex-col gap-3'>
                            <li className='font-bold'>Resources</li>
                            <li>Documentation</li>
                            <li>Github repo</li>
                            <li>Portfolio</li>
                            <li>LinkedIn</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='p-3'>
                <ul className='grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm text-center'>
                    <li className=''>sajankbastian@gmail.com</li>
                    <li className=''>Linked In</li>
                    <li className=''>Portfolio</li>
                    <li className=''>Github repo</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer