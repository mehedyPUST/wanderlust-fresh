
"use client"

import { UpdateUserModal } from "@/components/UpdateUserModal";
import { authClient } from "@/lib/auth-client";

import { Avatar, Card } from "@heroui/react";
import { MdEmail, MdPerson, MdVerified } from "react-icons/md";
import "animate.css";
const ProfilePage = () => {
    const userData = authClient.useSession();
    const user = userData.data?.user;

    return (
        <div className="bg-linear-to-r from-amber-50 via-white to-amber-50 min-h-screen py-8 animate__animated animate__backInRight">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span>👤</span>
                        <span>My Account</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent mb-4">
                        Profile
                    </h1>
                    <div className="w-24 h-1 bg-linear-to-r from-amber-600 to-orange-500 mx-auto rounded-full"></div>
                </div>

                {/* Profile Card */}
                <div className="flex justify-center items-center">
                    <Card className="max-w-md w-full border border-amber-100 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                        <div className="p-6 md:p-8 flex flex-col items-center">
                            {/* Avatar Section */}
                            <div className="relative mb-4">
                                <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-50"></div>
                                <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-amber-100 relative z-10">
                                    <Avatar.Image
                                        alt={user?.name || "User"}
                                        src={user?.image}
                                        referrerPolicy="no-referrer"
                                        className="object-cover"
                                    />
                                    <Avatar.Fallback className="bg-linear-to-r from-amber-600 to-orange-500 text-white text-2xl">
                                        {user?.name?.charAt(0) || "U"}
                                    </Avatar.Fallback>
                                </Avatar>

                                {/* Verified Badge */}
                                {user?.emailVerified && (
                                    <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1 border-2 border-white z-20">
                                        <MdVerified size={14} className="text-white" />
                                    </div>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="text-center space-y-3 w-full">
                                <div className="flex items-center justify-center gap-2">
                                    <MdPerson className="text-amber-500" size={18} />
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                        {user?.name || "User Name"}
                                    </h2>
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <MdEmail className="text-amber-500" size={16} />
                                    <p className="text-gray-600">
                                        {user?.email || "user@example.com"}
                                    </p>
                                </div>

                                {/* Member Since (Optional - you can add this from your user data) */}
                                <div className="pt-2">
                                    <span className="text-xs text-gray-400 bg-amber-50 px-3 py-1 rounded-full">
                                        Member since 2024
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full my-6">
                                <div className="h-px bg-linear-to-r from-transparent via-amber-200 to-transparent"></div>
                            </div>

                            {/* Update Button */}
                            <UpdateUserModal />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;