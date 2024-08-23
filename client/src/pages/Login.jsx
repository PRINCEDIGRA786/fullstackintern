import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        const json = await response.json();
        if (json.success) {
            alert("Logged in successfully");
            localStorage.setItem('token', json.authtoken);
            navigate('/')
           
        } else {
                console.log(json)
                alert(json.result);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div className='flex p-8 pr-2 bg-slate-50'>
            <div className='w-[80%] hidden lg:block'>
                <div className='flex space-x-3'>
                    <img src="https://png.pngtree.com/png-vector/20220518/ourmid/pngtree-man-studies-statistics-shown-on-bar-chart-png-image_4696931.png"
                        alt="loading" className='h-10 w-10 rounded-full brightness-75 contrast-200' />
                    <h1 className='text-xl font-extrabold'>Dashboard.com</h1>
                </div>
                <div className='py-3'>
                    <img src="https://mugenhubio.vercel.app/images/illustrations/auth/v2-login-light.png"
                        className='h-[450px] w-[550px] brightness-100 contrast-125 mx-auto' alt="" />
                </div>
            </div>

            <div className='space-y-5 px-4 ring-1 ring-slate-300 rounded-lg mx-auto lg:mx-0 py-4'>
                <h1 className='text-4xl font-extrabold'>Welcome to the Dashboard!</h1>
                <h2 className='text-2xl text-[#5f5d5d] font-bold'>Please sign in to your account and start the adventure</h2>

                <form onSubmit={handleLogin}>
                    <div className='flex flex-col space-y-2 py-2'>
                        <label className='text-lg font-bold text-blue-600' htmlFor='email'>Email</label>
                        <input
                            type="email"
                            placeholder='admin@gmail.com'
                            className='focus:outline-double focus:outline-blue-600 w-full rounded-xl text-sm p-3 px-4 outline outline-slate-200 font-semibold'
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col space-y-2 py-2'>
                        <label className='text-lg font-bold text-blue-600' htmlFor='password'>Password</label>
                        <input
                            type="password"
                            placeholder='********'
                            className='focus:outline-double focus:outline-blue-600 w-full rounded-xl text-sm p-3 px-4 outline outline-slate-200'
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='flex justify-between py-4'>
                        <div className='flex space-x-2'>
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me" className='text-md font-semibold text-slate-500 mb-1'>Remember me</label>
                        </div>
                        <h1 className='font-semibold text-blue-700 cursor-pointer'>Forgot Password?</h1>
                    </div>

                    <button type="submit" className='p-3 rounded-lg w-full text-center font-semibold bg-blue-700 text-white'>Login</button>
                </form>

                <h1 className='text-md text-center font-semibold'>
                    New on our platform? <span className='text-blue-700 cursor-pointer hover:text-blue-800' onClick={() => { navigate("/signup") }}>Create a new account</span>
                </h1>
            </div>
        </div>
    );
}
