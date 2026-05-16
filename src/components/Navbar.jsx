
"use client"
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import { router } from 'better-auth/api';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import React from 'react';

const Navbar = () => {

    const {
        data: session,

    } = authClient.useSession()

    const user = session?.user

    const router = useRouter();
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    // redirect to login page
                },
            },
        });
    }

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

                {user ? <>

                    <li>

                        <Avatar>
                            <Avatar.Image alt="John Doe" src={user?.image} />
                            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                        </Avatar>

                    </li>
                    <li>
                        <Button onClick={handleSignOut} variant='danger' className={'rounded-none'}>
                            Logout
                        </Button>
                    </li>
                </> :
                    <>
                        <li>
                            <Link href={"/login"}> Login </Link>
                        </li>
                        <li>
                            <Link href={"/signup"}> Sign up </Link>
                        </li>

                    </>





                }
            </ul>
        </nav>
    );
};

export default Navbar;