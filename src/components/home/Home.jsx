import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import PostCard from "../post-card/PostCard";
import axios from "axios";
import { NavLink } from "react-router-dom";
import './Home.css'
const Home = () => {
    const { user } = useContext(AuthContext);
    const [post, setPosts] = useState([])
    useEffect(() => {
        axios.get('https://advisoropediia-backend.vercel.app/posts', {
            headers: {
                authorization: localStorage.getItem('access-token'),
            }
        })
            .then(res => {
                console.log(res.data);
                setPosts(res.data);
            })
    }, [])
    return (
        <>
            <div className="mt-10 ">
                {
                    user ?
                        <div className="flex justify-center items-center">
                            <NavLink className='font-bold text-center mr-5 mt-10' to='/'>All Posts</NavLink>
                            <NavLink className='font-bold text-center mr-5 mt-10' to='/createPost'>Creat a Post</NavLink>
                        </div> :
                        <></>
                }
                <div className="max-w-7xl mx-auto mt-20">
                    {
                        user ?
                            <div className="grid grid-cols-1 gap-16">
                                {
                                    post.map(item => <PostCard key={item?.title} post={item}></PostCard>)
                                }
                            </div>
                            :
                            <>
                                <div className="flex flex-col justify-center items-center text-center">
                                    <h1 className="text-4xl font-bold mt-10 mb-5">Welcome to <span className="text-success">Advisoropedia</span></h1>
                                    <h3 className="text-xl font-bold px-5">Login using Google account or gmail to see Posts</h3>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default Home;