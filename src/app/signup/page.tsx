'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function SignUpPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        const { email, password, username } = user;
        if (email && password && username) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault(); // ✅ prevent default form submit
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            if (response.status === 201) {
                toast.success("User created successfully");
                router.push("/login");
            }
        } catch (error: any) {
            console.error("Signup Failed:", error.message);
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-black text-center">
                    {loading ? "Processing..." : "Sign Up"}
                </h2>
                <form onSubmit={onSignup}>
                    <div className="mb-4 text-black">
                        <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-4 text-black">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6 text-black">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-2 rounded text-white transition duration-200 ${
                            buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={buttonDisabled}
                    >
                        {buttonDisabled ? "Please fill all fields" : "Sign Up"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
