import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className='sticky top-0 flex justify-between p-5 bg-white shadow-md z-50'>
            <ul className='flex gap-3 '>
                <li>
                    <Link href={"/"}> Home </Link>
                </li>
                <li>
                    <Link href={"/destinations"}> Destinations </Link>
                </li>
                <li>
                    <Link href={"/my-bookings"}> My Bookings </Link>
                </li>
                <li>
                    <Link href={"/add-destination"}> Add Destination </Link>
                </li>
            </ul>

            <div>
                <Image src={'/assets/Wanderlast.png'} alt='img-wanderlast' height={80} width={200} />
            </div>

            <ul className='flex gap-3 '>
                <li>
                    <Link href={"profile"}> Profile </Link>
                </li>
                <li>
                    <Link href={"/login"}> Login </Link>
                </li>
                <li>
                    <Link href={"/signup"}> Sign up </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;