"use client"
import React, {useContext, useState} from 'react';
import Image from "next/image";
import {useForm} from 'react-hook-form';
import classNames from "classnames";
import cls from './Form.module.css'
import userIcon from '../../../public/images/icons/user_icon.svg'
import passwordIcon from '../../../public/images/icons/password_icon.svg'
import emailIcon from '../../../public/images/icons/email_icon.svg'
import nextIcon from '../../../public/images/icons/next_icon.svg'
import toast, {Toaster} from 'react-hot-toast';
import axios from "axios";
import {useRouter} from "next/navigation";
import {AuthContext} from "@/components/AuthProvider/AuthProvider";

export type FormData = {
    username: string;
    email?: string;
    password: string;
}

type FormProps = {
    isRegistration: boolean;
};

export const Form: React.FC<FormProps> = ({isRegistration}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const {setIsAuthenticated} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const onSubmit = async (data: FormData) => {
        // Handle login/register logic
        try {
            setLoading(true)
            const url = isRegistration ? '/api/users/signup' : '/api/users/login';
            await axios.post(url, data)
            setIsAuthenticated(true)
            toast.success('SUCCESS', {position: "top-right"})
            router.push('/')
        } catch (error) {
            const action = isRegistration ? "Signup" : "Login";
            toast.error(`${action} failed`, {position: "bottom-left"})
        } finally {
            setLoading(false)
        }
    };

    // if (loading)
    //     return (
    //         <Loader />
    //     )


    return (
        <div className={cls.container}>
            <Toaster/>
            <div className={cls.screen}>
                <div className={cls.screen__content}>
                    <form className={cls.login} onSubmit={handleSubmit(onSubmit)}>

                        <div className={cls.login__field}>
                            <Image
                                src={userIcon}
                                alt={"user Icon"}
                                className={cls.login__icon}
                                priority={false}
                            />
                            <input
                                type="text"
                                className={cls.login__input}
                                placeholder="Username"
                                {...register('username', {required: "Username is required"})}
                            />
                            {errors.username && <p>{errors.username?.message?.toString()}</p>}
                        </div>
                        {isRegistration && (
                            <div className={cls.login__field}>
                                <Image
                                    src={emailIcon}
                                    alt={"email Icon"}
                                    className={cls.login__icon__email}
                                    priority={false}
                                />
                                <input
                                    type="text"
                                    className={cls.login__input}
                                    placeholder="Email"
                                    {...register('email', {
                                        required: "Email is required", pattern:
                                            {value: /^\S+@\S+$/i, message: "Invalid email format"}
                                    })}
                                />
                                {errors.email && <p>{errors.email?.message?.toString()}</p>}
                            </div>
                        )}
                        <div className={cls.login__field}>
                            <Image
                                src={passwordIcon}
                                alt={"user Icon"}
                                className={cls.login__icon}
                                priority={false}
                            />
                            <input
                                type="password"
                                className={cls.login__input}
                                placeholder="Password"
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    }
                                })}
                            />
                            {errors.password && <p>{errors.password?.message?.toString()}</p>}
                        </div>
                        <button
                            className={classNames(cls.button, cls.login__submit)}
                            type="submit"
                        >
                            <span className={cls.button__text}>{isRegistration ? 'Register' : 'Login'}</span>
                            <Image src={nextIcon} alt={"user Icon"} className={cls.button__icon}/>
                        </button>
                    </form>
                </div>
                <div className={cls.screen__background}>
                    <span className={classNames(cls.screen__background__shape, cls.screen__background__shape4)}></span>
                    <span className={classNames(cls.screen__background__shape, cls.screen__background__shape3)}></span>
                    <span className={classNames(cls.screen__background__shape, cls.screen__background__shape2)}></span>
                    <span className={classNames(cls.screen__background__shape, cls.screen__background__shape1)}></span>
                </div>
            </div>
        </div>
    );
};
