import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import gravatar from 'gravatar';
import { useInput } from '@hooks/useInput';
import { ChatBox, ChatList } from '@components';
import axios from 'axios';
import useSocket from '@hooks/useSocket';
import { IUser, IDM } from '@typings/db';

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
  } = useSWR<IDM[] | undefined>(`/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`, fetcher);
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
          <button type="button" className="mt-[4px] flex items-center justify-center rounded-[4px] overflow-hidden">
            <img src={gravatar.url(userData?.email, { s: '24px', d: 'retro' })} alt="" />
          </button>
          <span className="ml-[10px]">{userData?.email}</span>
        </h3>
      </div>
      <ChatList chatData={chatData} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmit={onSubmit} />
    </>
  );
};

export default DirectMessage;
