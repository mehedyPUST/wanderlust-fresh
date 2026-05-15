import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationPage = async () => {
    const res = await fetch('http://localhost:5000/destination');
    const destinations = await res.json()
    console.log(destinations)
    return (
        <div className='w-11/12 mx-auto'>
            <h1>All Destinations</h1>

            <div className='grid grid-cols-3 gap-5 md:gap-10'>
                {
                    destinations.map(destination =>

                        <DestinationCard key={destination._id} destination={destination}></DestinationCard>


                    )}
            </div>

        </div >
    );
};

export default DestinationPage;