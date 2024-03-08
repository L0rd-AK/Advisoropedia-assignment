import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl font-bold">Advisoropedia</a>
            </div>
            
            <div className="navbar-end">
                <Link to="/login">
                <a className="btn">Login</a>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;