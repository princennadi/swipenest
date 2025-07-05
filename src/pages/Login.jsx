import React from 'react';
import BottomNav from '../components/BottomNav'; // adjust path if needed

const Login = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Realtor Login</h1>
      <form className="bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <input type="text" placeholder="Username" className="w-full p-2 rounded border" />
        <input type="password" placeholder="Password" className="w-full p-2 rounded border" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
