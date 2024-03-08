import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    return (
        <div className="navbar bg-slate-200">
            <div className="navbar-start">
               <Link to='/'> <a className="btn btn-ghost text-xl font-bold text-success">Advisoropedia</a></Link>
            </div>

            <div className="navbar-end">
                {
                    user ?
                        <>
                            <div className='flex bg-[#1ca77462] rounded-full pl-8 pr-1 py-1 gap-4 justify-center items-center mr-5'>
                                <p className='text-black font-semibold '>{user.displayName}</p>
                                <img className="rounded-full h-10 mr-5 lg:mr-0" src={user.photoURL || 'https://i.ibb.co/3dqGpTW/dummy-prof.png'} alt="" />
                            </div>
                            <Link onClick={() => logOut()} to='/'>
                                <a className="btn bg-Primary text-white">Log out</a>
                            </Link>
                        </>
                        :
                        <Link to="/login">
                            <a className="btn bg-Primary text-white">Login</a>
                        </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;