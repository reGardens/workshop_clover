import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const CreateContent = () => {
    const { data, setData, errors, post, progress } = useForm({
        title: "",
        banner: null,
        narasumber: "",
        date: "",
        description: "",
        short_description: "",
    });

    const storePost = async (e) => {
        e.preventDefault();
        post(route("store.content"));
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form name="createForm" onSubmit={storePost}>
                <div className="p-3 shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] grid gap-3 rounded-sm">
                    <div className="w-full flex justify-start items-end text-white">
                        <Link href={route("landing")}>
                            <button
                                type="submit"
                                className="py-1 px-3 bg-blue-500 rounded-md"
                            >
                                Back
                            </button>
                        </Link>
                    </div>

                    <label>title</label>
                    <input
                        type="text"
                        name="title"
                        // value={data.title}
                        className="w-[30rem] rounded-sm"
                        onChange={(e) => setData("title", e.target.value)}
                    />

                    <label className="block text-sm font-medium text-gray-900">
                        Upload file
                    </label>
                    <input
                        className="w-[30rem] text-sm text-gray-900 border rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        name="banner"
                        onChange={(e) => setData("banner", e.target.files[0])}
                    />
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                    >
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>

                    <label>Narasumber</label>
                    <input
                        type="text"
                        name="narasumber"
                        className="w-[30rem] rounded-sm border"
                        onChange={(e) => setData("narasumber", e.target.value)}
                    />

                    <label>Date</label>
                    <input
                        type="date"
                        className="w-[30rem] rounded-sm"
                        name="date"
                        onChange={(e) => setData("date", e.target.value)}
                    />

                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        className="w-[30rem] rounded-sm"
                        onChange={(e) => setData("description", e.target.value)}
                    />

                    <label>Short Description</label>
                    <input
                        type="text"
                        name="short_description"
                        className="w-[30rem] rounded-sm"
                        onChange={(e) =>
                            setData("short_description", e.target.value)
                        }
                    />

                    <div className="w-full flex justify-end items-end text-white">
                        <button
                            type="submit"
                            className="py-1 px-3 bg-blue-500 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateContent;
