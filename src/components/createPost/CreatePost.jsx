import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CreatePost = () => {
    const navigate = useNavigate();
    const AddPost=e=>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const title = form.get('title');
        const postedDate = form.get('postedDate');
        const img = form.get('photo');
        const description = form.get('description');
        const post={
            title,postedDate,img,description
        }
        axios.post('https://advisoropediia-backend.vercel.app/post',post,{
            headers: {
                authorization: localStorage.getItem('access-token'),
            }
        })
        .then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfuly Post created',
                })
                navigate('/');
            } else {
                toast(`${res.data.message}`)
            }
        })
    }
    return (
        <section className="bg-white ">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-10 text-2xl font-bold text-black ">Post a new Job</h2>
                <namem action="#">
                    <form onSubmit={AddPost}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label name="title" className="block mb-2 text-sm font-medium text-black">Post Title:</label>
                                <input type="text" name="title" id="title" className="input input-bordered input-accent w-full bg-transparent" placeholder="Type product name" required="" />
                            </div>
                            <div className="w-full">
                                <label name="postedDate" className="block mb-2 text-sm font-medium text-black">Posted date(use - between day,month & year):</label>
                                <input type="text" name="postedDate" id="postedDate" className="input input-bordered input-accent w-full bg-transparent" placeholder="Type product name" required="" />
                            </div>
                            <div className="w-full">
                                <label name="photo" className="block mb-2 text-sm font-medium text-black">Image URL:</label>
                                <input type="text" name="photo" id="photo" className="input input-bordered input-accent w-full bg-transparent" placeholder="Type product name" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label name="description" className="block mb-2 text-sm font-medium text-black">Description</label>
                                <textarea name='description' id="description" rows="8" className="input input-bordered input-accent w-full bg-transparent h-24" placeholder="Your description here"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="bg-[#1CA774] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Add Post
                        </button>
                    </form>
                </namem>
            </div>
        </section>
    );
};

export default CreatePost;