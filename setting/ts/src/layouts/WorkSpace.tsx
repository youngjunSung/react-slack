import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

interface WorkSpaceProps {
  children: ReactNode;
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
        {/* 워크스페이스 */}
        <section className="flex flex-col p-[6px] w-[70px]">
          <button
            type="button"
            className="flex justify-center items-center rounded-[6px] bg-[#ababad] text-black text-[20px] font-bold w-[36px] h-[36px]"
          >
            R
          </button>
        </section>
        {/* 채널 리스트 */}
        <section className="bg-[#f9edff1c]">
          <h2>channel</h2>
        </section>
        {/* 채널 */}
        <section>{children}</section>
      </main>
    </div>
  );
};

export default WorkSpace;
