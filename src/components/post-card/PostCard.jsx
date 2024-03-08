

const PostCard = ({post}) => {

    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl mx-5">
                <figure><img className="lg:w-[1200px] lg:h-[300px]" src={post?.img} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{post?.title}</h2>
                    <p>Posted on: <i>{post?.postedDate}</i></p>
                    <p> <span className="font-bold">Description:</span> {post?.description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn bg-Primary text-white">Read more</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostCard;