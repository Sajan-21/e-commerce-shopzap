import React from 'react'

const Banner = () => {
    return (
        <div>
            <div className='home-banner-bg-img bg-no-repeat bg-cover p-10 flex flex-col gap-5 items-start max-sm:items-center'>
                <h1 className='text-5xl max-sm:text-center'>Your better choices are everyone's<br />better world.</h1>
                <p className='max-sm:hidden'>try out some awesome products with us.</p>
                <button className='px-3 py-2 hover:bg-red-100 hover:font-bold hover:shadow-2xl border border-black hover:border-white'>Shop Now</button>
            </div>
        </div>
    )
}

export default Banner