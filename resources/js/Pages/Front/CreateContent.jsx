import React from "react";

const CreateContent = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            {/* <Form > */}
            <div className="p-3 shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] grid gap-3 rounded-sm">
                <label htmlFor="title">title</label>
                <input
                    type="text"
                    name="title"
                    className="w-[30rem] rounded-sm"
                />

                <label htmlFor="banner">Select Image</label>
                <input
                    type="image"
                    name=""
                    id=""
                    className="w-[30rem] rounded-sm"
                />

                <label htmlFor="narasumber">Narasumber</label>
                <input
                    type="text"
                    name="narasumber"
                    className="w-[30rem] rounded-sm"
                />

                <label htmlFor="date">Date</label>
                <input type="date" className="w-[30rem] rounded-sm" />

                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    className="w-[30rem] rounded-sm"
                />

                <label htmlFor="short_description">Short Description</label>
                <input
                    type="text"
                    name="short_description"
                    className="w-[30rem] rounded-sm"
                />

                <div className="w-full flex justify-end items-end text-white">
                    <button className="py-1 px-3 bg-blue-500 rounded-md">
                        Submit
                    </button>
                </div>
            </div>
            {/* </Form> */}
        </div>
    );
};

export default CreateContent;
