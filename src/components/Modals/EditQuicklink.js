import React from 'react';
import { useFormik } from 'formik';

import { editQuicklinkObj } from '../../util/storage';

function EditQuicklink(props) {

    const formik = useFormik({
        initialValues: {
            quicklink_name: props.quicklink.quicklink_name,
            quicklink_url: props.quicklink.quicklink_url,
            quicklink_description: props.quicklink.quicklink_description,
        },
        onSubmit: (values) => {
            editQuicklinkObj(props.workspace, props.quicklink.quicklink_name, values);
            props.close(false);
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="border-4 border-blue-400">
                <div className="mx-12 flex flex-col justify-between gap-y-8">
                    <div className="flex flex-col items-center justify-between">
                        <label htmlFor="quicklink_name">Quicklink Name: </label>
                        <input
                            id="quicklink_name"
                            name="quicklink_name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.quicklink_name}
                            className="w-full p-2 border border-blue-400 rounded"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <label htmlFor="quicklink_url">Quicklink URL: </label>
                        <input
                            id="quicklink_url"
                            name="quicklink_url"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.quicklink_url}
                            className="w-full p-2 border border-blue-400 rounded"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <label htmlFor="quicklink_description">Quicklink Description: </label>
                        <input
                            id="quicklink_description"
                            name="quicklink_description"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.quicklink_description}
                            className="w-full p-2 border border-blue-400 rounded"
                        />
                    </div>
                    <button type="submit"
                        className="p-2 bg-blue-500 submit-button text-white mt-6 rounded hover:bg-blue-400">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default EditQuicklink;