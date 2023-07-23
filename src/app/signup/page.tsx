"use client"
import {useRouter} from "next/navigation";
import axios from "axios";
import {Form} from "@/components/UserForm/Form";
export default function SignUp() {

    const {push} = useRouter()
    return (
       <Form isRegistration={true}/>
    )
}
