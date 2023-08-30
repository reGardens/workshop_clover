import React, { useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

const LandingPage = ({ posts }) => {
    console.log("first", posts);
    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("destroy.form", id), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "", "success");
                    },
                    onError: () => {
                        Swal.fire("Error Deleted!", "", "error");
                    },
                });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <div className="px-14 py-2">
            {/* <div className="flex mb-10 text-white">
                <Link href={route("create.content")} method="get">
                    <button className="bg-blue-500 rounded-md">
                        <p className="px-3 py-1">create</p>
                    </button>
                </Link>
            </div> */}

            <div className="grid grid-cols-3 gap-5">
                {posts.map((data, index) => {
                    return (
                        <div
                            key={index}
                            className="border-[1px] flex-1 gap-2 !relative"
                        >
                            <div className="">
                                <img
                                    src={data.banner}
                                    alt=""
                                    className="w-full h-full"
                                />
                            </div>

                            <div className="py-3 px-4 h-full min-h-[17rem]">
                                {data.id}
                                <p className="text-2xl mb-1">{data.title}</p>
                                <p className="text-xs opacity-75 mb-1">
                                    {data.narasumber} &nbsp; {data.date}
                                </p>
                                <p className="lg:line-clamp-4 md:line-clamp-3">
                                    <span className="uppercase">
                                        narasumber
                                    </span>{" "}
                                    -{data.description}
                                </p>

                                <div className="absolute bottom-4 flex flex-wrap gap-1">
                                    {/* <Link
                                        href={route("detail.page", {
                                            post: data.id,
                                        })}
                                    >
                                        <button className="rounded-md py-1 px-3 bg-blue-500 text-white">
                                            read more...
                                        </button>
                                    </Link>
                                    <Link
                                        href={route(`edit.form`, {
                                            post: data.id,
                                        })}
                                    >
                                        <button className="rounded-md py-1 px-3 bg-yellow-500">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(data.id)}
                                        className="rounded-md py-1 px-3 bg-red-500 ml-2"
                                    >
                                        Deleted
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;
