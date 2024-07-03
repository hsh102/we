import React from 'react'

const Models = () => {
    return (
        <div className="p-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Models</h2>
                    <p className="max-w-[700px] text-[#fdfcdc] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Browse our diverse portfolio of professional models available for your next project.
                    </p>
                </div>
            </div>
            <div className="mx-auto grid grid-cols-2 gap-4 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[...Array(24).keys()].map(i => (
                    <img
                        key={i+1}
                        src={`/m${i+1}.jpg`}
                        width="300"
                        height="300"
                        alt="Model"
                        className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                    />
                ))}
            </div>
        </div>
    )
}

export default Models
