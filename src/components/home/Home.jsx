import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import PostCard from "../post-card/PostCard";
import axios from "axios";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [post, setPosts] = useState([])
   useEffect(()=>{
        axios.get('http://localhost:5000/posts',{
            headers: {
                authorization: localStorage.getItem('access-token'),
            }
        })
        .then(res => {
            console.log(res.data);
            setPosts(res.data);
        })
   },[])
    return (
        <>
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
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-4xl font-bold mt-10 mb-5">Welcome to <span className="text-success">Advisoropedia</span></h1>
                                <h3 className="text-xl font-bold">Login using Google account or gmail to see Posts</h3>
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default Home;