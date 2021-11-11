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
            <div className="mx-12 flex flex-col justify-between gap-y-8">
                <div className="flex justify-between">
                    <label htmlFor="quicklink_name">Quicklink Name: </label>
                    <input
                        id="quicklink_name"
                        name="quicklink_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.quicklink_name}
                    />
                </div>
                <div className="flex justify-between">
                    <label htmlFor="quicklink_url">Quicklink URL: </label>
                    <input
                        id="quicklink_url"
                        name="quicklink_url"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.quicklink_url}
                    />
                </div>
                <div className="flex justify-between">
                    <label htmlFor="quicklink_description">Quicklink Description: </label>
                    <input
                        id="quicklink_description"
                        name="quicklink_description"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.quicklink_description}
                    />
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default EditQuicklink;