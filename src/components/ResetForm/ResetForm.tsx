"use client"
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {useRouter} from "next/navigation";

export type FormData = {
    password: string
    token: string
    confirmPassword: string
}



export const ResetForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
    const [token, setToken] = useState("")
    const route = useRouter()
    const password = watch('password');

    const onSubmit = async (data: FormData) => {
        try {
            await axios.post('/api/users/forgotPasswordReset', { newPassword: data.password, token });
            route.push('/login'); // redirect to login page or home page
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken)
    }, [])

    return (
        <form className="p-6 mx-auto max-w-lg h-screen flex justify-center items-center flex-col " onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl mb-4">Reset Password</h2>

            <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters"
                    }
                })}
            />
            {errors.password && <p className="text-red-500">{errors.password && errors?.password?.message?.toString()}</p>}

            <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                    validate: value =>
                        value === password || "The passwords do not match"
                })}
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword && errors?.confirmPassword?.message?.toString() }</p>}

            <button className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1">
                Reset Password
            </button>
        </form>
    );
};

