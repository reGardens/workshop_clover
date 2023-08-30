import { Link, useForm } from "@inertiajs/react";
import React from "react";

const CardEdit = ({ post }) => {
    const { data, setData, errors, processing, put } = useForm({
        title: post.title,
        banner: null,
        narasumber: post.narasumber,
        date: post.date,
        description: post.description,
        short_description: post.short_description,
    });

    // jika handle perubahan di gabung
    const handleChange = (e, value) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: value }));
    };

    const updateForm = (e) => {
        e.preventDefault();

        put(route("update.form", { post: post.id }));
    };
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form name="updateForm" onSubmit={updateForm}>
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
                        value={data.title}
                        className="w-[30rem] rounded-sm"
                        onChange={(e) => handleChange(e, e.target.value)}
                        // onChange={(e) => setDatas("title", e.target.value)}
                    />

                    <label className="block text-sm font-medium text-gray-900">
                        Upload file
                    </label>
                    <input
                        onInput={(e) => handleChange(e, e.target.files[0])}
                        className="w-[30rem] text-sm text-gray-900 border rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:placeholder-gray-400 pointer-events-none"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        name="banner"
                        // value={datas.banner}
                        // onChange={handleChange}
                    />
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
                        value={data.narasumber}
                        onChange={(e) => handleChange(e, e.target.value)}
                        // onChange={(e) => setDatas("narasumber", e.target.value)}
                    />

                    <label>Date</label>
                    <input
                        type="date"
                        className="w-[30rem] rounded-sm"
                        name="date"
                        value={data.date}
                        onChange={(e) => handleChange(e, e.target.value)}
                        // onChange={(e) => setDatas("date", e.target.value)}
                    />

                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        className="w-[30rem] rounded-sm"
                        value={data.description}
                        onChange={(e) => handleChange(e, e.target.value)}
                        // onChange={(e) =>
                        //     setDatas("description", e.target.value)
                        // }
                    />

                    <div className="w-full flex justify-end items-end font-bold">
                        <button
                            type="submit"
                            className="py-1 px-3 bg-green-500 rounded-md"
                            disabled={processing}
                        >
                            Sumbit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CardEdit;
