import React, { useState } from 'react';
import './Options.css';

import DropDown from '../components/dropdown'
import MainModal from '../components/Modals/newModal';
import Collection from '../components/Collection';
import Footer from '../components/Footer';

import { initStorage, fetchWorkspace } from '../util/storage'

function Options() {
  
  const [current, setCurrent] = useState("")

  return (
    <div>
      <h1 className="text-center text-3xl my-4">QuickLinks Configuration</h1>
      <div className="w-1/2 mx-auto flex flex-row justify-center items-start gap-x-2">
        <div className="w-3/4 flex-shrink-0 relative">
          <DropDown className="z-10" items="w-full h-full bg-blue-400 p-2 rounded" current={current} toChange={setCurrent} options="w-full"></DropDown>
        </div>
        <div>
          <MainModal current={current} toChange={setCurrent}/>
        </div>
      </div>
      <div className="w-1/3 mx-auto border-2 rounded border-gray-400 p-4">
        <Collection current={current}/>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Options;
