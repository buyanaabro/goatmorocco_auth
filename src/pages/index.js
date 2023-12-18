import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import axios  from 'axios'
import Link from 'next/link'

export default function Home() {

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPasswor ] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [ user, setUser ] = useState(null)

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
  }
  const login = () => {
    axios({
      method: 'post',
      data: {
        username: loginUsername,
        email: loginEmail,
        password: loginPassword
      },
      withCredentials: true,
      url: 'http://localhost:3001/login'
    }).then(res => {console.log(res.config.xsrfCookieName)}).catch(err => {console.log(err)})
  }
  const getUser  = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:3001/getUser'
    }).then(res => {setUser(res.data.username)}).catch(err => {console.log(err)})
  }


  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-red-300">
      <div className="flex-row space-x-12">
        <div className="w-96 h-96 flex rounded-xl justify-center items-center bg-white backdrop-blur-sm flex-col space-y-4">
          <Link
            className="px-8 py-4 w-2/3 rounded-md bg-amber-300 flex justify-center"
            href="/register"
          >
            Register
          </Link>
          <Link
            className="px-8 py-4 w-2/3 rounded-md bg-amber-300 flex justify-center"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="px-8 py-4 w-2/3 rounded-md bg-cyan-600 flex justify-center"
            href="/profile"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
