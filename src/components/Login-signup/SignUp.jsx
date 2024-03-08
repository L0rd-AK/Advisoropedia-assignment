import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import axios from "axios";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const SignUp = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [toglePassword, setToglePassword] = useState(true)
    const [toglePassword1, setToglePassword1] = useState(true)
    const { createUser, upDateProfile, setToogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const handlePass = e => {
        setPassword(e.target.value)
    }
    const handlePass2 = e => {
        setConfirmPassword(e.target.value)
    }
    const handleShowPass=()=>{
        console.log('demon of the 4th generation');
        setToglePassword(!toglePassword)
    }
    const handleShowPass1=()=>{
        console.log('demon of the 4th generation');
        setToglePassword1(!toglePassword1)
    }
    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        const ConfirmPassword = form.get('confirm password');
        const Name = form.get('name');
        const Photo = form.get('photo');
        if(password!==ConfirmPassword){
            toast.error("Password & Confirm password doesn't match");
            return;
        }
        // upDateProfile(Name,Photo);
        createUser(email, password)
            .then(result => {
                upDateProfile(Name, Photo);
                const newUser = { email, password, Name, Photo: Photo ? Photo : 'https://i.ibb.co/3dqGpTW/dummy-prof.png' }
                axios.post('http://localhost:5000/users', newUser)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfuly Account created',
                            })
                            navigate('/');
                        } else {
                            toast(`${res.data.message}`)
                        }
                    })

                setToogle(true);
                toast.success(`successfully created account`);
                navigate('/');
                console.log(result.user)
            })
            .catch(error => {
                toast.error(`${error.code}`);
                console.error(error)
            })


    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            <section className="bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="mb-10 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <namem className="space-y-4 md:space-y-6" action="#">
                                <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                                    <div>
                                        <label name="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amit Kumar" />
                                    </div>
                                    <div>
                                        <label name="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proffile picture URL</label>
                                        <input type="text" name="photo" id="photo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="URL" />
                                    </div>
                                    <div>
                                        <label name="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                    </div>
                                    <div className="relative">
                                        <label name="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input onChange={handlePass} type={toglePassword?"password":"text"} name="confirm password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        {
                                            password ?
                                                <label className="swap absolute -mt-8 ml-[350px] ">
                                                    {/* this hidden checkbox controls the state */}
                                                    <input type="checkbox" />
                                                    {/* volume on icon */}
                                                    <FaEye onClick={handleShowPass} className="swap-on fill-current text-white text-xl"></FaEye>
                                                    {/* volume off icon */}
                                                    <FaEyeSlash onClick={handleShowPass}  className="swap-off fill-current text-white text-xl"></FaEyeSlash>
                                                </label> :
                                                <></>
                                        }
                                    </div>
                                    <div className="relative">
                                        <label name="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                        <input onChange={handlePass2} type={toglePassword1?"password":"text"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        {
                                            confirmPassword ?
                                                <label className="swap absolute -mt-8 ml-[350px] ">
                                                    {/* this hidden checkbox controls the state */}
                                                    <input type="checkbox" />
                                                    {/* volume on icon */}
                                                    <FaEye onClick={handleShowPass1} className="swap-on fill-current text-white text-xl"></FaEye>
                                                    {/* volume off icon */}
                                                    <FaEyeSlash onClick={handleShowPass1}  className="swap-off fill-current text-white text-xl"></FaEyeSlash>
                                                </label> :
                                                <></>
                                        }
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label name="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-[#1CA774] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <Link to='/login'><a href="#" className="font-medium text-[#1CA774] hover:underline dark:text-primary-500">Login here</a></Link>
                                    </p>
                                </form>
                            </namem>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;