














// import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { TrashBin } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // const { token } = await auth.api.getToken({
    //     headers: await headers(),
    // });

    const user = session?.user;
    const res = await fetch(`http://localhost:5000/booking/${user.id}`)
    const bookings = await res.json();

    return (
        <div className="w-11/12 mx-auto">
            <h1 className="text-3xl font-bold mb-5">My Bookings</h1>
            <div className="space-y-5">
                {bookings.map((booking) => (
                    <div key={booking._id} className="flex gap-5 border p-5 min-w-3xl">
                        <Image
                            src={booking.imageUrl}
                            alt={booking.destinationName}
                            height={200}
                            width={200}
                        />
                        <div>
                            <h1 className="font-bold text-2xl">{booking.destinationName}</h1>
                            <p>
                                {new Date(booking.departureDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>

                            <p>Booking Id: {booking._id}</p>

                            <p className="text-3xl font-bold text-cyan-500">
                                ${booking.price}
                            </p>

                            {/* <BookingCancelAlert bookingId={booking._id} /> */}

                            <BookingCancelAlert bookingId={booking._id} />

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookingsPage;








// import { auth } from '@/lib/auth';
// import { headers } from 'next/headers';
// import Image from 'next/image';
// import React from 'react';

// const MyBookingsPage = async () => {

//     const session = await auth.api.getSession({
//         headers: await headers() // you need to pass the headers object.
//     })
//     const user = session?.user


//     const res = await fetch(`http://localhost:5000/booking/${user.id}`)
//     const bookings = await res.json()
//     console.log(bookings)

//     return (
//         <div className='w-11/12 mx-auto'>
//             <h1 className='text-3xl font-bold'>My bookings</h1>


//             <div>
//                 {
//                     bookings.map(booking => <div key={booking._id}>
//                         <Image alt={booking.destinationName}
//                             src={booking.imageUrl}
//                             height={300}
//                             width={300}
//                         >

//                         </Image>
//                     </div>)
//                 }
//             </div>



//         </div>
//     );
// };

// export default MyBookingsPage;
