import { Link } from "@inertiajs/react";
import React from "react";

const LandingPage = ({ posts }) => {
    console.log("post", posts);

    return (
        <div className="px-14 py-2">
            <div className="flex mb-10 text-white">
                <button className="bg-blue-500 rounded-md">
                    <p className="px-3 py-1">create</p>
                </button>
            </div>
            
            <div className="grid grid-cols-3 gap-5">
                {posts.map((data, index) => {
                    return (
                        <div
                            key={index}
                            className="border-[1px] flex-1 gap-2 !relative"
                        >
                            <div className="">
                                <img
                                    src="https://placehold.co/600x400"
                                    alt=""
                                    className="w-full h-full"
                                />
                            </div>

                            <div className="py-3 px-4 h-full min-h-[17rem]">
                                <p className="text-2xl mb-1">{data.title}</p>
                                <p className="text-xs opacity-75 mb-1">
                                    {data.narasumber} &nbsp; {data.date}
                                </p>
                                <p className="">
                                    <span className="uppercase">
                                        narasumber
                                    </span>{" "}
                                    -{data.description}
                                </p>
                                <Link className="absolute bottom-4">
                                    <button className="rounded-md py-1 px-3 bg-blue-500 text-white">
                                        read more...
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;
