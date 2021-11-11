import React, { Fragment, useState, useEffect, useRef } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
import { Menu } from '@headlessui/react';

import NewWorkspaceModal from './newWorkspace';
import NewQuicklinkModal from './newQuicklink';

function MainModal(props) {
    const { current } = props;
    const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
    const [showQLModal, setShowQLModal] = useState(false);
    const [modal, setModal] = useState();

    const resetModal = () => {
        setModal(null);
    }

    const closeWorkspaceModal = () => {
        setShowWorkspaceModal(false);
    }

    const closeQLModal = () => {
        setShowQLModal(false);
    }

    const handleModal = (e) => {
        e.preventDefault();
        if(e.target.value === "new-workspace") {
             setModal(<NewWorkspaceModal toOpen={true} close={closeWorkspaceModal} clean={resetModal} />);
        } else {
             setModal(<NewQuicklinkModal toOpen={true} close={closeQLModal} current={current} clean={resetModal}/>);
        }
    }

    return (
        <div>
            <Menu>
                <Menu.Button className="rounded-full">
                    <button className="rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                    </button>
                </Menu.Button>
                <div className="absolute">
                    <Menu.Items>
                        <div className="flex flex-col border-2 rounded-md border-gray-500 divide-y-2">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active && 'bg-blue-400 text-white'} px-6 py-3 rounded-md`}
                                        value="new-workspace"
                                        onClick={handleModal}
                                    >
                                        <div className="flex gap-x-2 justify-between items-center pointer-events-none">
                                            Create New Workspace
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11h4m-2-2v4" />
                                            </svg>
                                        </div>
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active && 'bg-blue-400 text-white'} px-6 py-3 rounded-md`}
                                        value="new-quicklink"
                                        onClick={handleModal}
                                    >
                                        <div className="flex gap-x-2 justify-between items-center pointer-events-none">
                                            Create New Quicklink
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 transform -rotate-45" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </div>
            </Menu>
            {modal}
        </div>
    );
}

export default MainModal;
