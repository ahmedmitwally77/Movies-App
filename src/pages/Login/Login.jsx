import axios from '@/api/axios';
import logo from '../../assets/download-removebg-preview.png';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const nav = useNavigate();

  const createToken = () => {
    axios.get(`/authentication/token/new`)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.request_token);
      }).catch((err) => {
        console.log(err);
      })
  }

  const login = () => {
    const body = {
      username: name,
      password: pass,
      request_token: localStorage.getItem('token')
    }
    axios.post(`/authentication/token/validate_with_login`, body)
      .then((res) => {
        console.log(res.data);
        toast.success('Logged In Successfully', { position: "top-center" })
        setTimeout(() => {
          nav('/home')
        }, 1250)
        createSession();
      }).catch((err) => {
        console.log(err);
        toast.error(err.response.data.status_message, { position: "top-center" })
      })
  }

  const createSession = () => {
    const body = {
      request_token: localStorage.getItem('token')
    }
    axios.post(`/authentication/session/new`, body)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('sessionId', res.data.session_id)
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    createToken();
  }, [])


  return (
    <div className="bg-[#44406F] h-screen flex items-center justify-center">
      <div className="bg-[#2A254B] p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header with logo */}
        <div className="flex flex-col items-center mb-6">
          <img className="h-10 mb-4" src={logo} alt="logo" />
          <h1 className="text-white text-3xl font-semibold mb-2">
            Welcome back!
          </h1>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="email">
            Username
          </label>
          <input
            id="email"
            type="email"
            placeholder="name_name"
            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-8">
          <label
            className="block text-gray-300 text-sm mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition" onClick={login}>
          Login
        </button>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="https://www.themoviedb.org/signup" className="text-indigo-400 hover:underline" target='__blank'>
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
