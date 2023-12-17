import { useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router';

export default function Login() {

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword ] = useState('')
    const router = useRouter()

    const login = () => {
        axios({
          method: 'post',
          data: {
            email: loginEmail,
            password: loginPassword
          },
          withCredentials: true,
          url: 'http://localhost:3001/login'
        }).then(res => {console.log(res)}).catch(err => {console.log(err)})
        .then((res) => router.push("/"))
    }



    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            <h1 className='m-8 text-xl font-semibold'>Sign in</h1>
            <div className='flex space-x-4'>
                <input className='px-4 py-2 rounded-md' type="email" name="email" placeholder="email" onChange={e => setLoginEmail(e.target.value )}/>
                <input className='px-4 py-2 rounded-md' type="password" name="password" placeholder="password" onChange={e => setLoginPassword(e.target.value )}/>
                <button className='px-8 py-2 rounded-md bg-amber-300' onClick={login}>Login</button>
            </div>
        </div>
    )
}