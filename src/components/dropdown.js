import React, { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';

import { fetchWorkspace } from '../util/storage';

function DropDown(props) {

    const [workspaces, setWorkspaces] = useState([""]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        const promise = fetchWorkspace();
        promise.then((response) => {
            setWorkspaces(response);
        })
    },[workspaces]);

    return (
        <Listbox value={props.current} onChange={props.toChange}>
            <Listbox.Button className={props.items + ' text-white text-base'}>{props.current || "Choose Workspace"}</Listbox.Button>
            <Listbox.Options className="absolute z-10 w-full bg-blue-50 rounded">
                {workspaces.map((workspace) => (
                    <Listbox.Option
                        className={({active}) => 
                            `${active ? "bg-blue-200 text-white" : " "}  px-6 py-2 text-center cursor-pointer m-2 rounded`}
                        value={workspace}
                        key={workspace}
                    >
                        {workspace}
                    </Listbox.Option>
                ))}
            </Listbox.Options>

        </Listbox>
    );
}

export default DropDown;