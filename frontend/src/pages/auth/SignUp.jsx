import React, { use, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { IoIosPeople, IoMdStarOutline } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";

const Login = () => {
 
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [profilePic, setProfilePic] = useState(null)
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [showAdminInviteToken, setShowAdminInviteToken] = useState(false)

  const handleSumbit = (e) => {
    e.preventDefault();

    if(!fullName) {
      setEmail("Please enter the name ")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email adress");
      return;
    }

    if (!password) {
      setError("please enter the password");
      return;
    }

    setError(null);

    // SignUp  API call
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Gradient top border */}
          <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-300 "></div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <IoIosPeople className="text-4xl text-blue-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mt-4 uppercase">
                join project Flow
              </h1>
              <p className="text-gray-600 mt-1">
                Start managing you projects efficiently
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSumbit}>

             <ProfilePhotoSelector image={profilePic} 
             setImage={setProfilePic}
             />

              {/* Email Setup */}

             <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter FullName
                </label>
                <input
                  id="name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline
               focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                  placeholder="FullName"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Adress
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline
               focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                  placeholder="your@email.com"
                  required
                />
              </div>
              {/* password */}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>

                <div className="relative">
                  <input

                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline
                focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12
                "
                    placeholder="•••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <IoEye />}
                  </button>
                </div>
              </div>
                
                <div>
                  

                  <label
                  htmlFor="admin"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Invite Token
                </label>

                  <div className="relative">
                 <input onChange={(e) => setAdminInviteToken(e.target.value)} 
                 id="adminInviteToken" 
                 type={showAdminInviteToken ? "text" : "password"} value={adminInviteToken}
                   placeholder="••••••• " className=" rounded-lg border py-3 px-4
                 w-full  focus:outline  focus:ring-2  focus:ring-blue-500 focus:border-transparent pr-12" />

                    <button type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover-text-gray-700"
                    onClick={() => setShowAdminInviteToken(!showAdminInviteToken)}
                    >
                      {showAdminInviteToken ? <FaEyeSlash/> : <IoEye/>}
                    </button>

                   </div>
                 </div> 
                 


              {error && <P className="text-red-500 text-sm">{error}</P>}

              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full  flex justify-center py-3 border
                border-transparent rounded-md shadow-sm  text-sm font-medium text-white 
                bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-0
                 focus:outline  focus:ring-offset-0 cursor-pointer     
                 "
                >
                  Login
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                already have an accoutn?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-blue-600 hover:text-blue-500 "
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
