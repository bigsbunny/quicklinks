import React, { useState, useEffect } from 'react';
import logo from './img/logo.svg';
import './App.css';

import { useStateWithCallbackInstant } from 'use-state-with-callback';
import DropDown from './components/dropdown';
import { openOptionsPage } from './util/runtime';
import { initStorage, fetchWorkspaceQuicklinks, getPopupLastWorkspace, setPopupLastWorkspace } from './util/storage';
import { openURLAsTab } from './util/tabs';

function App() {

  const [current, setCurrent] = useState('');
  const [quicklinks, setQuicklinks] = useStateWithCallbackInstant([''], (quicklinks) => {
    if (current !== "") {
      fetchWorkspaceQuicklinks(current).then(response => {
        let arr = response[current];
        setQuicklinks(arr);
      })
    }
  })

  useEffect(() => {
    getPopupLastWorkspace().then((response) => {
      setCurrent(response);
    })
  }, []);

  useEffect(() => {
    setPopupLastWorkspace(current);
  }, [current]);

  return (
    <div className="popup-dimensions p-2 mx-auto">
      <div className="flex justify-center items-center mb-4">
        <img src={logo} alt="Quicklinks Logo" />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 settings-icon cursor-pointer" onClick={openOptionsPage} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div className="w-4/5 mx-auto">
        <DropDown
          items="mx-auto w-full bg-blue-400 p-2 rounded"
          options="w-4/5"
          current={current}
          toChange={setCurrent} />
        <div className="flex flex-col gap-y-2 mt-4 p-3 border-2 border-blue-200 rounded">
          {
            (quicklinks.length === 1)
            ? (<p className="">There are currently no Quicklinks in this workspace. </p>)
            : quicklinks.map((quicklink) => {
              if (!quicklink.description) {
                return (
                  <button
                    type="button"
                    className="p-2 bg-blue-400 text-white rounded truncate"
                    link={quicklink.quicklink_url}
                    onClick={(e) => openURLAsTab(e.target.attributes.link.value)}>{quicklink.quicklink_name}</button>
                );
              }
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
