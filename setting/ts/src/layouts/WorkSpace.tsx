import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Outlet } from 'react-router-dom';
import * as Icon from '@assets/icons';
import gravatar from 'gravatar';
import { Button, Menu, MenuItem, Popover } from '@mui/material';

const WorkSpace = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <div className="flex flex-col h-full bg-primary">
      <header className="flex min-h-[40px] py-[6px] px-[10px]">
        {/* <button type="button" className="ml-auto text-white" onClick={onSubmit}>
          로그아웃
        </button> */}
      </header>
      <main className="flex flex-1 min-h-0">
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
          <button type="button" onClick={handleClick} className="flex items-center justify-center mt-auto rounded-[4px] overflow-hidden">
            <img src={gravatar.url(data.email, { s: '36px', d: 'retro' })} alt="" />
          </button>
          <Popover
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: -10,
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Popover>
        </div>
        <article className="flex flex-1 mb-[5px] mr-[5px] rounded-[8px] overflow-hidden">
          <div className="flex flex-col bg-[#f9edff1c] w-[320px]">
            <div className="py-[16px] px-[20px]">
              <h2 className="text-[18px] font-bold text-white">Work Space</h2>
            </div>
            <div className="flex-1 overflow-auto pb-[16px] px-[20px]">
              <details className="group" open>
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
                  <Link to="channel" className="py-[4px] text-[14px] text-white font-normal text-left">
                    Ch1
                  </Link>
                  <Link to="channel" className="py-[4px] text-[14px] text-white font-normal text-left">
                    Ch2
                  </Link>
                </div>
              </details>
              <details className="group" open>
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
                  {[...Array(100)].map((_, idx) => {
                    return (
                      <Link key={idx} to="dm" className="py-[4px] text-[14px] text-white font-normal text-left">
                        id{idx}
                      </Link>
                    );
                  })}
                </div>
              </details>
            </div>
          </div>
          <div className="flex flex-col flex-1 overflow-auto bg-white">
            <Outlet />
          </div>
        </article>
      </main>
    </div>
  );
};

export default WorkSpace;
