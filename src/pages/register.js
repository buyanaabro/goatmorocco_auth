import { useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router';

export default function Register() {

    const [registerUsername, setRegisterUsername] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword ] = useState('')
    const router = useRouter();

    const register = () => {
        axios({
          method: 'post',
          data: {
            username: registerUsername,
            email: registerEmail,
            password: registerPassword
          },
          withCredentials: true,
          url: 'http://localhost:3001/register'
        }).then(res => {console.log(res)}).catch(err => {console.log(err)})
        .then((res) => router.push("/"))
      }

    return (
      <div className="w-screen h-screen flex justify-center items-center flex-col bg-red-300">
        <div className="w-96 h-96 flex rounded-xl justify-center items-center bg-white backdrop-blur-sm flex-col">
          <h1 className="m-8 text-xl font-semibold">Sign up</h1>
          <div className="flex space-y-4 flex-col">
            <input
              className="px-4 py-2 rounded-md border border-stone-300"
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
              className="px-4 py-2 rounded-md border border-stone-300"
              type="text"
              name="email"
              placeholder="email"
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              className="px-4 py-2 rounded-md border border-stone-300"
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button
              className="px-8 py-2 rounded-md bg-amber-300"
              onClick={register}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
}