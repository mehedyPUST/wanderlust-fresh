

"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import "animate.css";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { MdEmail, MdLock, MdPerson, MdImage } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries())
        console.log(user)
        const loadingToast = toast.loading("Creating your account...");

        try {
            const { data, error } = await authClient.signUp.email({
                email: user.email,
                password: user.password,
                name: user.name,
                image: user.image
            });

            console.log({ data, error })


            if (error) {
                toast.dismiss(loadingToast);

                // Custom meaningful errors
                if (error.message?.includes("already")) {
                    toast.error("This email is already registered. Try signing in instead.");
                } else {
                    toast.error("Signup failed. Please check your details and try again.");
                }
                return;
            }

            toast.dismiss(loadingToast);

            toast.success(" Account created successfully! Welcome to SunCart.");

            // small delay for better UX
            setTimeout(() => {
                router.push("/");
            }, 1200);

        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleGoogleSignIn = async () => {
        const loadingToast = toast.loading("Redirecting to Google...");

        try {
            await authClient.signIn.social({
                provider: "google"
            });
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Google sign-in failed. Try again.");
        }
    };
    return (
        <div className="bg-linear-to-r from-amber-50 via-white to-amber-50 min-h-screen py-8 animate__animated   animate__backInDown">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span>📝</span>
                        <span>Join Us Today</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent mb-4">
                        Create Account
                    </h1>
                    <div className="w-24 h-1 bg-linear-to-r from-amber-600 to-orange-500 mx-auto rounded-full"></div>
                    <p className="text-gray-500 mt-4">
                        Sign up for exclusive deals and summer offers
                    </p>
                </div>

                {/* Sign Up Card */}
                <div className="flex justify-center items-center">
                    <Card className="w-full max-w-md border border-amber-100 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                        <div className="p-6 md:p-8">
                            <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
                                {/* Name Field */}
                                <TextField isRequired name="name" type="text">
                                    <Label className="text-gray-700 font-semibold">Full Name</Label>
                                    <div className="relative">
                                        <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            placeholder="Enter your name"
                                            className="pl-10 border-amber-100 focus:border-amber-400 w-full"
                                        />
                                    </div>
                                    <FieldError />
                                </TextField>

                                {/* Image URL Field */}
                                <TextField isRequired name="image" type="text">
                                    <Label className="text-gray-700 font-semibold">Profile Image URL</Label>
                                    <div className="relative">
                                        <MdImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            placeholder="https://example.com/avatar.jpg"
                                            className="pl-10 border-amber-100 focus:border-amber-400 w-full"
                                        />
                                    </div>
                                    <FieldError />
                                </TextField>

                                {/* Email Field */}
                                <TextField
                                    isRequired
                                    name="email"
                                    type="email"
                                    validate={(value) => {
                                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                            return "Please enter a valid email address";
                                        }
                                        return null;
                                    }}
                                >
                                    <Label className="text-gray-700 font-semibold">Email</Label>
                                    <div className="relative">
                                        <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            placeholder="john@example.com"
                                            className="pl-10 border-amber-100 focus:border-amber-400 w-full"
                                        />
                                    </div>
                                    <FieldError />
                                </TextField>

                                {/* Password Field */}
                                <TextField
                                    isRequired
                                    minLength={8}
                                    name="password"
                                    type="password"
                                    validate={(value) => {
                                        if (value.length < 8) {
                                            return "Password must be at least 8 characters";
                                        }
                                        if (!/[A-Z]/.test(value)) {
                                            return "Password must contain at least one uppercase letter";
                                        }
                                        if (!/[0-9]/.test(value)) {
                                            return "Password must contain at least one number";
                                        }
                                        return null;
                                    }}
                                >
                                    <Label className="text-gray-700 font-semibold">Password</Label>
                                    <div className="relative">
                                        <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            placeholder="Enter your password"
                                            className="pl-10 border-amber-100 focus:border-amber-400 w-full"
                                        />
                                    </div>
                                    <Description className="text-gray-400">
                                        Must be at least 8 characters with 1 uppercase and 1 number
                                    </Description>
                                    <FieldError />
                                </TextField>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-linear-to-r from-amber-600 to-orange-500 text-white font-semibold hover:from-amber-700 hover:to-orange-600 transition-all hover:scale-105 shadow-md"
                                    >
                                        <Check size={18} />
                                        Create Account
                                    </Button>
                                    <Button
                                        type="reset"
                                        variant="flat"
                                        className="border border-amber-200 text-gray-600 hover:bg-amber-50"
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </Form>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-amber-100"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-400">Or continue with</span>
                                </div>
                            </div>

                            {/* Google Sign In Button */}
                            <Button
                                onClick={handleGoogleSignIn}
                                className="w-full border border-amber-200 bg-white text-gray-700 font-semibold hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
                            >
                                <FcGoogle />
                                Sign Up with Google
                            </Button>

                            {/* Sign In Link */}
                            <p className="text-center text-sm text-gray-600 mt-6">
                                Already have an account?{' '}
                                <Link href="/signin" className="text-amber-600 font-semibold hover:text-amber-700 hover:underline transition-colors">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}