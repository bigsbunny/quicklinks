import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useFormik } from 'formik';

import DropDown from '../dropdown';
import  { addNewQuicklink } from '../../util/storage';

function NewQuicklinkModal(props) {

    const { toOpen, current, clean } = props;
    const [open, setOpen] = useState(toOpen);
    const [workspace, setWorkspace] = useState(current);

    const formik = useFormik({
        initialValues: {
            quicklink_name: '',
            quicklink_url: '',
            quicklink_description: '',
        },
        onSubmit: (values) => {
            addNewQuicklink(values, workspace);
            closeModal();
        }
    })

    const closeModal = () => {
        setOpen(false);
        clean();
    }

    return (
        <Dialog open={open} onClose={closeModal} className="fixed inset-0 z-10">
        <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="relative bg-white rounded mx-auto px-6 py-3 text-center w-1/3 border-4 border-blue-400 rounded">
                <Dialog.Title className="text-3xl my-3 underline text-blue-500">New Quicklink</Dialog.Title>
                <Dialog.Description>
                    <span className="text-blue-400">Add a new Quicklink to your workspace.</span>
                </Dialog.Description>

                <DropDown 
                    items="w-1/2 h-full bg-blue-400 p-1.5 rounded mt-6" 
                    current={workspace} 
                    toChange={setWorkspace}
                    options="w-full">
                </DropDown>
                <form className="m-4 mt-6" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-y-4">
                        <input type="text" id="quicklink_name" name="quicklink_name" placeholder="Quicklink name" autocomplete="off"
                            onChange={formik.handleChange}
                            className="p-2 text-lg border border-blue-400 rounded" />
                        <input type="text" id="quicklink_url" name="quicklink_url" placeholder="URL" autocomplete="off" 
                            onChange={formik.handleChange}
                            className="p-2 text-base border border-blue-400 rounded" />
                        <input type="text" id="quicklink_description" name="quicklink_description" placeholder="Quicklink Description" autocomplete="off" 
                        onChange={formik.handleChange}
                        className="p-2 text-base border border-blue-400 rounded" />
                    </div>
                    <button type="submit" name="add-workspace"
                        className="p-2 bg-blue-500 submit-button text-white mt-6 rounded hover:bg-blue-400">Create</button>
                </form>
            </div>
        </div>
    </Dialog>   
    );
}

export default NewQuicklinkModal;
