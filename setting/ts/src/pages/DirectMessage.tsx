import React, { useState, useCallback, useEffect, useRef } from 'react';
import WorkSpace from '../layouts/WorkSpace';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import gravatar from 'gravatar';
import { useInput } from '@hooks/useInput';
import autosize from 'autosize';
import { ChatBox } from '@components';
import axios from 'axios';
import useSocket from '@hooks/useSocket';

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const [socket] = useSocket(workspace);
  const { data: userData, error, mutate } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  // const {
  //   data: chatList,
  //   error: error2,
  //   mutate: mutate2,
  // } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const {
    data: chatData,
    error: error2,
    mutate: mutate2,
  } = useSWR(`/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`, fetcher);
  const [chat, setChat, onChangeChat] = useInput('');
  const onSubmit = () => {
    console.log('메세지 전송');
    axios
      .post(
        `/api/workspaces/${workspace}/dms/${id}/chats`,
        { content: chat },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        setChat('');
        mutate2();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    socket?.on('dm', (data: number[]) => {
      mutate2();
    });
    return () => {
      socket?.off('dm');
    };
  }, []);
  console.log(chatData);
  return (
    <>
      <div className="py-[16px] px-[20px]">
        <h3 className="flex items-center text-[18px] font-bold text-black">
          <img src={gravatar.url(userData?.email, { s: '24px', d: 'retro' })} alt="" />
          <span className="ml-[10px]">{userData?.email}</span>
        </h3>
      </div>
      <div className="flex-1 py-[16px] px-[20px]">
        {chatData?.map((e: any, idx: number) => {
          return <p key={idx}>{e.content}</p>;
        })}
      </div>
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmit={onSubmit} />
    </>
  );
};

export default DirectMessage;
