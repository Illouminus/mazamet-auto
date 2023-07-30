"use client"
import React, {memo, useContext, useState} from 'react';
import Image from "next/image";
import {useForm} from 'react-hook-form';
import classNames from "classnames";
import cls from './Form.module.css'
import userIcon from '../../../public/images/icons/user_icon.svg'
import passwordIcon from '../../../public/images/icons/password_icon.svg'
import emailIcon from '../../../public/images/icons/email_icon.svg'
import nextIcon from '../../../public/images/icons/next_icon.svg'
import toast, {Toaster} from 'react-hot-toast';
import {useRouter} from "next/navigation";
import {AuthContext} from "@/providers/AuthProvider/AuthProvider";
import {useAppDispatch} from "@/lib/useAppDispatch/useAppDispatch";
import {loginByUsername} from "@/components/UserForm/asyncThunkLogin/asyncThunkLogin";
import {useSelector} from "react-redux";
import {getUserForm} from "@/components/UserForm/selectors/userFormSelectors";

export type FormData = {
    username: string;
    email?: string;
    password: string;
}

type FormProps = {
    isRegistration: boolean;
};

export const Form: React.FC<FormProps> = memo(({isRegistration}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {isLoading, error} = useSelector(getUserForm)
    const onSubmit = async (data: FormData) => {
        try {
            const path = isRegistration ? '/api/users/signup' : '/api/users/login';
            const result  = await dispatch(loginByUsername({path, username: data.username, email: data.email, password: data.password}))
            if (result.type === "login/loginByUsername/rejected") {
                toast.error('Mot de passe incorrect',  {position: "top-right"})
            } else {
                setIsAuthenticated(true)
                toast.success('Connecté', {position: "top-right"})
                setTimeout(() => {
                    router.push('/admin')
                }, 2000)
            }

            // router.push('/')
        } catch (error) {
            const action = isRegistration ? "Signup" : "Login";
            toast.error(`${error} failed`, {position: "bottom-left"})
        }
    };



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
});
