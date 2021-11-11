import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import { useStateWithCallbackInstant } from 'use-state-with-callback';

import { fetchWorkspaceQuicklinks, deleteQuicklink } from '../util/storage';

import EditQuicklink from './Modals/EditQuicklink';

function Collection(props) {

    const currentWorkspace = props.current;
    const [quicklinks, setQuicklinks] = useStateWithCallbackInstant([""], (quicklinks) => {
        if (currentWorkspace !== "") {
            fetchWorkspaceQuicklinks(currentWorkspace).then(response => {
                let arr = response[currentWorkspace];
                setQuicklinks(arr);
            })
        }
    })

    const [editQuicklink, setEditQuicklink] = useState(false);
    const [divRender, setDivRender] = useState('')

    const handleDelete = (e) => {
        const quicklink = e.target.parentNode.parentNode.id;
        deleteQuicklink(currentWorkspace, quicklink);
    }

    const handleQuicklinkEdit = (quicklink, e) => {
        setEditQuicklink(true);
        setDivRender(<EditQuicklink workspace={currentWorkspace} quicklink={quicklink} close={setEditQuicklink} />)
    };

    if (currentWorkspace === "") {
        return (
            <div className="">
                <p className="w-1/2 text-center mx-auto">Select a workspace to display your Quicklinks</p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col">
                {quicklinks.map((quicklink) => {
                    if (!quicklink.description) {
                        return (
                            <div className="mb-2.5">
                                <Disclosure>
                                    <Disclosure.Button
                                        className={({ open }) => `${open ? "rounded-t" : "rounded"} bg-gray-400 p-3 text-lg w-full truncate`}>
                                        {quicklink.quicklink_name}
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="Collection-Panel-Item border-2 border-gray-400 rounded-b py-4 px-2">
                                        <div id={quicklink.quicklink_name} className="flex flex-col gap-y-3">
                                            <div className="text-center">
                                                <p
                                                className="mb-2"
                                                >
                                                    Quicklink URL:
                                                </p>
                                                <p 
                                                className="text-sm truncate border border-gray-400 rounded p-2 underline"
                                                >
                                                    <a href={quicklink.quicklink_url}>{quicklink.quicklink_url}</a>
                                                </p>
                                            </div>

                                            <div className="text-center">
                                                <p
                                                className="mb-2"
                                                >
                                                    Quicklink Description: 
                                                </p>
                                                <p 
                                                className="text-sm border border-gray-400 rounded p-2"
                                                >
                                                    {quicklink.quicklink_description}
                                                </p>
                                            </div>
                                            <div className="flex justify-center gap-x-2">
                                                <button type="button" className="bg-yellow-400 rounded-md p-2 text-white"
                                                    onClick={(e) => handleQuicklinkEdit(quicklink, e)}>Edit</button>
                                                <button type="button" className="bg-red-500 rounded-md p-2 text-white" onClick={handleDelete}>Delete</button>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </Disclosure>
                            </div>
                        )
                    }
                })}
            </div>

            <Dialog open={editQuicklink} onClose={() => setEditQuicklink(false)}
                className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="relative inset-0 bg-white rounded w-1/3 mx-auto">
                        {divRender}
                    </div>
                </div>

            </Dialog>
        </div>
    );
}

export default Collection;