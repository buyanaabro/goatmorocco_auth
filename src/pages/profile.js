import { useState, useEffect } from 'react'
import axios from "axios";
import Link from 'next/link';

export default function Profile() {
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    const getUser  = () => {
        axios({
          method: 'get',
          withCredentials: true,
          url: 'http://localhost:3001/getUser'
        }).then(res => {setUser(res.data.username)}).catch(err => {console.log(err)})
    }
    const handleLogout = () => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:3001/logout',
        })
            .then(req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.clearCookie('XSRF-TOKEN');

            res.status(200).send('User logged out');
        }))
            .catch((err) => {
                console.log(err)
            });
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='space-y-4'>
                <h1 className='text-2xl font-semibold'>Profile</h1>
                <h1 className='text-xl'>Username: {user}</h1>
                <h1><Link className='px-8 py-2 rounded-md bg-cyan-600' href="/">Return to Home page</Link></h1>
                <h1><Link onClick={handleLogout} href="/">Log out</Link></h1>
            </div>
        </div>
    )
}