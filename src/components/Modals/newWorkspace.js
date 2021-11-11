import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useFormik } from 'formik';

import { workspaceCollection, addNewWorkspace } from '../../util/storage';

function NewWorkspaceModal(props) {

    let { toOpen, clean } = props;
    const [open, setOpen] = useState(toOpen);
    const [workspaceName, setWorkspaceName] = useState("");
    const [workspaceDescription, setWorkspaceDescription] = useState("");

    const closeModal = () => {
        setOpen(false);
        clean();
    }

    const formik = useFormik({
        initialValues: {
            workspace: '',
            "workspace-description": ''
        },
        onSubmit: (values) => {
            addWorkspace(values.workspace, values["workspace-description"]);
            closeModal();
        }
    })

    // const handleNameChange = (e) => {
    //     setWorkspaceName(e.target.value);
    // }

    // const handleDescriptionChange = (e) => {
    //     setWorkspaceDescription(e.target.value);
    // }

    // const handleSubmit = (e) => {
    //     // e.preventDefault();
    //     addWorkspace(workspaceName, workspaceDescription);
    // }

    const addWorkspace = (workspaceName, workspaceDescription) => {
        workspaceCollection(workspaceName);
        addNewWorkspace(workspaceName, workspaceDescription);
    }

    return (
        <Dialog open={open} onClose={closeModal} className="fixed inset-0 z-10">
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <div className="relative bg-white rounded mx-auto px-6 py-3 text-center text-blue-500 border-4 border-blue-400">
                    <Dialog.Title className="text-3xl my-3 underline">New Workspace</Dialog.Title>
                    <Dialog.Description>
                        Create a new workspace to manage your quicklinks.
                    </Dialog.Description>
                    <div className="m-4 mt-6">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col gap-y-4 text-black" >
                                <input type="text" id="workspace" name="workspace" placeholder="Workspace name" autocomplete="off" 
                                    onChange={formik.handleChange}
                                    className="p-2 text-lg border-2 border-blue-400 rounded" />
                                <input type="text" id="workspace-description" name="workspace-description" placeholder="Workspace description" autocomplete="off" 
                                    onChange={formik.handleChange}
                                    className="p-2 text-md border-2 border-blue-400 rounded" />
                            </div>
                            <button type="submit" name="add-workspace" 
                                className="mt-6 p-2 submit-button bg-blue-500 text-white text-md rounded hover:bg-blue-400"
                                >
                                    Create
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default NewWorkspaceModal;
