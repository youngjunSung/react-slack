import React, { useEffect, useState, useCallback } from 'react';
import WorkSpace from '../layouts/WorkSpace';
import { useParams } from 'react-router-dom';
import useSocket from '@hooks/useSocket';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useInput } from '@hooks/useInput';
import { ChatBox, ChatList, TextField, Button } from '@components';
import { IUser, IChat } from '@typings/db';
import axios from 'axios';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import { PersonAdd } from '@mui/icons-material/';
import { Menu, MenuItem, Popover, Divider, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Channel = () => {
  const { workspace, channel, id } = useParams();
  const [socket] = useSocket(workspace);
  const [chat, setChat, onChangeChat] = useInput('');

  const [newChannelMember, setNewChannelMember, onChangeNewChannelMember] = useInput('');
  const [openDialogInviteChannel, setOpenDialogInviteChannel] = useState(false);
  const handleDialogInviteChannelOpen = () => {
    setOpenDialogInviteChannel(true);
  };
  const handleDialogInviteChannelClose = () => {
    setOpenDialogInviteChannel(false);
  };
  const {
    data: chatData,
    error: error2,
    mutate: mutate2,
  } = useSWR<IChat[] | undefined>(`/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=1`, fetcher);
  const onSubmit = () => {
    console.log('메세지 전송');
    axios
      .post(
        `/api/workspaces/${workspace}/channels/${channel}/chats`,
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
  const handleInviteChannel = () => {
    axios
      .post(
        `/api/workspaces/${workspace}/channels/${channel}/members`,
        { email: newChannelMember },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        setNewChannelMember('');
        handleDialogInviteChannelClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    socket?.on('message', (data: number[]) => {
      mutate2();
    });
    return () => {
      socket?.off('message');
    };
  }, []);
  console.log(chatData);
  return (
    <>
      <div className="flex items-center py-[16px] px-[20px] border-b border-b-[#eee]">
        <h3 className="text-[18px] font-bold text-black">{channel}</h3>
        <button type="button" onClick={handleDialogInviteChannelOpen} className="ml-auto center">
          <PersonAdd />
        </button>
        <Dialog
          open={openDialogInviteChannel}
          onClose={handleDialogInviteChannelClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <span className="text-[18px] text-primary font-bold">사용자 초대</span>
          </DialogTitle>
          <DialogContent>
            <TextField label="이메일" type="email" value={newChannelMember} onChange={onChangeNewChannelMember} />
          </DialogContent>
          <DialogActions>
            <Button text="초대하기" onClick={handleInviteChannel} />
          </DialogActions>
        </Dialog>
      </div>
      <div className="flex flex-col-reverse flex-1 py-[16px] px-[20px] min-h-0 overflow-auto">
        {/* <ChatList chatData={chatData} /> */}
        {chatData?.map((e: any, idx: number) => {
          return (
            <div key={idx} className="flex items-start">
              <button type="button" className="mt-[4px] flex items-center justify-center rounded-[4px] overflow-hidden">
                <img src={gravatar.url(e.User.email, { s: '24px', d: 'retro' })} alt="" />
              </button>
              <div className="ml-[6px]">
                <div className="flex items-center mb-[4px]">
                  <p className="text-[16px] text-black font-[600] mr-[4px]">{e.User.nickname}</p>
                  <p className="text-[12px] text-gray-500 font-[400]">{dayjs(e.createdAt).format('h:mm A')}</p>
                </div>
                <p>{e.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmit={onSubmit} />
    </>
  );
};

export default Channel;
