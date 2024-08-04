import React, { useState, useCallback } from 'react';
import WorkSpace from '../layouts/WorkSpace';
import { useParams } from 'react-router-dom';

const Channel = () => {
  const params = useParams();
  return (
    <>
      <div className="py-[16px] px-[20px]">
        <h3 className="text-[18px] font-bold text-black">{params.channel}</h3>
      </div>
      <div className="flex-1 py-[16px] px-[20px]"></div>
      <div className="px-[20px] pb-[20px]">
        <textarea
          name=""
          id=""
          className="resize-none p-[10px] border-[1px] border-gray-300 border-solid w-full rounded-[8px]"
        ></textarea>
      </div>
    </>
  );
};

export default Channel;
