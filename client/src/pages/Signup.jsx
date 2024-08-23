import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSignup = async () => {
        try {
            // console.log("email is:", formData.email);
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name
                })
            });
            const json = await response.json();
            if (json.success) {
                alert("Account created successfully and logged-in....");
                localStorage.setItem('token', json.authtoken);
                navigate('/');
            } else {
                console.log(json);
                alert("Error creating account");
            }
        } catch (err) {
            alert(err);
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
            <div className='w-[70%] hidden lg:block'>
                <div className='flex space-x-3'>
                    <img src="https://png.pngtree.com/png-vector/20220518/ourmid/pngtree-man-studies-statistics-shown-on-bar-chart-png-image_4696931.png" 
                        alt="loading" className='h-10 w-10 rounded-full brightness-75 contrast-200' />
                    <h1 className='text-xl font-extrabold'>Dashboard.com</h1>
                </div>

                <div className='py-3'>
                    <img src="https://prep27.com/assets/images/woman-working-on-laptop.png" 
                        className='h-[480px] brightness-100 contrast-125 w-[480px] mx-auto' alt="" />
                </div>
            </div>

            <div className='space-y-5 mx-auto lg:mx-0 px-4 ring-1 ring-slate-300 lg:w-[40%] rounded-lg py-4'>
                <h1 className='text-4xl font-extrabold'>Adventure Starts here!</h1>
                <h2 className='text-xl text-[#5f5d5d] font-bold'>Make your data management easy and fun</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                    <div className='flex flex-col space-y-2'>
                        <label className='text-lg font-bold text-blue-600' htmlFor='username'>Username</label>
                        <input
                            type="text"
                            placeholder='Prince'
                            className='focus:outline-double focus:outline-blue-600 w-full rounded-xl text-sm p-3 px-4 outline outline-slate-200 font-semibold'
                            id="username"
                            name="name"
                            autoComplete="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label className='text-lg font-bold text-blue-600' htmlFor='email'>Email</label>
                        <input
                            type="email"
                            placeholder='admin@gmail.com'
                            className='focus:outline-double focus:outline-blue-600 w-full rounded-xl text-sm p-3 px-4 outline outline-slate-200 font-semibold'
                            id="email"
                            name="email"
                            value={formData.email}
                            autoComplete="email"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label className='text-lg font-bold text-blue-600' htmlFor='password'>Password</label>
                        <input
                            type="password"
                            placeholder='********'
                            className='focus:outline-double focus:outline-blue-600 w-full rounded-xl text-sm p-3 px-4 outline outline-slate-200'
                            id="password"
                            name="password"
                            value={formData.password}
                            autoComplete="current-password"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex space-x-2'>
                        <input type="checkbox" />
                        <h1 className='text-md font-semibold text-slate-500 mb-1'>
                            I agree to <span className='text-blue-700'>Privacy policy & terms</span>
                        </h1>
                    </div>

                    <button type="submit" className='p-3 rounded-lg w-full text-center font-semibold bg-blue-700 text-white'>
                        Signup
                    </button>
                    <h1 className='text-md text-center font-semibold'>
                        Already have an account? <span className='text-blue-700 hover:text-blue-900 cursor-pointer' onClick={() => { navigate('/login') }}>sign-in instead</span>
                    </h1>
                </form>
            </div>
        </div>
    );
}
