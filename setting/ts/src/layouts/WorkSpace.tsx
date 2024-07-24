import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import * as Icon from '@assets/icons';

interface WorkSpaceProps {
  children?: ReactNode;
}

const WorkSpace = ({ children }: WorkSpaceProps) => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const onSubmit = useCallback(
    (e) => {
      axios
        .post('http://localhost:3095/api/users/logout', null, {
          withCredentials: true,
        })
        .then(() => {
          mutate();
        });
    },
    [data],
  );

  if (!data) return <Navigate to="/" />;

  return (
    <div className="flex flex-col bg-[#461448] h-full">
      <header className="flex min-h-[40px] py-[6px] px-[10px]">
        <button type="button" className="ml-auto text-white" onClick={onSubmit}>
          로그아웃
        </button>
      </header>
      <main className="flex flex-1">
        <div className="flex flex-col shrink-0 items-center py-[14px] px-[6px] w-[70px]">
          <button
            type="button"
            className="flex justify-center items-center rounded-[6px] bg-[#ababad] text-black text-[20px] font-bold w-[36px] h-[36px] [&:not(:last-child)]:mb-[20px]"
          >
            R
          </button>
          <button
            type="button"
            className="flex justify-center items-center rounded-[6px] bg-[#ababad] text-black text-[20px] font-bold w-[36px] h-[36px] [&:not(:last-child)]:mb-[20px]"
          >
            S
          </button>
          <button
            type="button"
            className="flex justify-center items-center rounded-[6px] text-black text-[20px] font-bold w-[36px] h-[36px] [&:not(:last-child)]:mb-[20px]"
          >
            <Icon.Plus width={20} height={20} color="#fff" />
          </button>
        </div>
        <article className="flex flex-1 mb-[5px] mr-[5px] rounded-[8px] overflow-hidden">
          <div className="bg-[#f9edff1c] w-[320px] py-[16px] px-[20px]">
            <h2 className="mb-[16px] text-[18px] font-bold text-white">Work Space</h2>
            <details className="px-[14px] group">
              <summary className="flex items-center py-[6px] text-[14px] text-white font-normal pl-[6px]">
                <Icon.TriangleDown
                  width={10}
                  height={10}
                  color="#fff"
                  className="mr-[8px] rotate-[-90deg] group-open:rotate-[0deg] transition-all"
                />{' '}
                Channels
              </summary>
              <div className="flex flex-col">
                <button type="button" className="py-[4px] text-[14px] text-white font-normal text-left">
                  Ch1
                </button>
                <button type="button" className="py-[4px] text-[14px] text-white font-normal text-left">
                  Ch2
                </button>
              </div>
            </details>
            <details className="px-[14px] group">
              <summary className="flex items-center py-[6px] text-[14px] text-white font-normal pl-[6px]">
                <Icon.TriangleDown
                  width={10}
                  height={10}
                  color="#fff"
                  className="mr-[8px] rotate-[-90deg] group-open:rotate-[0deg] transition-all"
                />{' '}
                Direct Messages
              </summary>
              <div className="flex flex-col">
                <button type="button" className="py-[4px] text-[14px] text-white font-normal text-left">
                  id1
                </button>
                <button type="button" className="py-[4px] text-[14px] text-white font-normal text-left">
                  id2
                </button>
              </div>
            </details>
          </div>
          <div className="flex-1 bg-white">{children}</div>
        </article>
      </main>
    </div>
  );
};

export default WorkSpace;
