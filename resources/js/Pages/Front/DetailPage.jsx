import { Link } from "@inertiajs/react";
import React from "react";

const DetailPage = ({ post }) => {
    console.log("first", post);

    return (
        <div className="p-4">
            <div className="w-full flex justify-start items-end text-white pb-4">
                <Link href={route("landing")}>
                    <button
                        type="submit"
                        className="py-1 px-3 bg-blue-500 rounded-md"
                    >
                        Back
                    </button>
                </Link>
            </div>

            <div className="flex gap-5">
                <div className="w-full g-full">
                    <img src="https://placehold.co/400x500" alt="" />
                </div>

                <div className="">
                    <p>
                        <strong>ID</strong> : {post.id}
                    </p>
                    <p>
                        <strong>Title</strong> : {post.title}
                    </p>
                    <p>
                        <strong>Narasumber</strong> : {post.narasumber}
                    </p>
                    <p>
                        <strong>Date</strong> : {post.date}
                    </p>
                    <p>
                        <strong>Description</strong> : {post.description}
                    </p>
                    <p>
                        <strong>Release Date</strong> : {post.created_at}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
