import React, { useState } from "react";
import logo from "../../assets/logo-fav.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@test.com" && password === "123456") {
      toast.success("เข้าสูระบบสำเร็จ!");
      navigate("/dashboard");
    } else {
      setError("❌ Email หรือ Password ไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* กรอบ Login */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 border border-gray-200">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-24 w-24 mb-2" />
          <h1 className="text-2xl font-bold text-gray-700">TK Ricemill</h1>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Info */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          ตัวอย่าง Email: <span className="font-mono">admin@test.com</span>
          <br />
          ตัวอย่าง Password: <span className="font-mono">123456</span>
        </div>
      </div>
    </div>
  );
};

export default Login;