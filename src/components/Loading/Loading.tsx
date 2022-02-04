import React from 'react';

export const Loading = () => {
  return <div className="fixed flex w-full h-full justify-center items-center bg-dark">
    <div>
      <div className="w-14 h-14 border-4 border-solid mx-auto animate-loader border-l-0 rounded-full"/>
      <div className="flex flex-col mt-4">
        <h1 className="text-xl text-white">Loading</h1>
        <div className="grid grid-cols-3 mt-4">
          <span className="w-1.5 h-1.5 mx-auto rounded-full animate-jump-dots"/>
          <span className="w-1.5 h-1.5 mx-auto rounded-full animate-jump-dots"/>
          <span className="w-1.5 h-1.5 mx-auto rounded-full animate-jump-dots"/>
        </div>
      </div>
    </div>
  </div>;
};

