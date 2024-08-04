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

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const { data: userData, error, mutate } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const [chat, setChat, onChangeChat] = useInput('');
  const onSubmit = () => {

  }
  console.log(chat);
  
  return (
    <>
      <div className="py-[16px] px-[20px]">
        <h3 className="flex items-center text-[18px] font-bold text-black">
          <img src={gravatar.url(userData?.email, { s: '24px', d: 'retro' })} alt="" />
          <span className="ml-[10px]">{userData?.email}</span>
        </h3>
      </div>
      <div className="flex-1 py-[16px] px-[20px]"></div>
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmit={onSubmit} />
    </>
  );
};

export default DirectMessage;
