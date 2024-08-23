import React, { useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IUser, IChat, IDM } from '@typings/db';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import Scrollbars from 'react-custom-scrollbars';
import regexifyString from 'regexify-string';
import { Chat } from '@components';

export const ChatList = ({ chatData }: { chatData: { [key: string]: (IDM | IChat)[] } }) => {
  const refScrollbars = useRef(null);
  // const result = regexifyString({
  //   input: chatData?.content,
  //   pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
  //   decorator(match, index) {
  //     const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;
  //     if (arr) {
  //       return (
  //         <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
  //           @{arr[1]}
  //         </Link>
  //       );
  //     }
  //     return <br key={index} />;
  //   },
  // });
  const handleScroll = useCallback(() => {
    console.log(122);
  }, []);
  return (
    <Scrollbars ref={refScrollbars} onScrollFrame={handleScroll} autoHide>
      <div className="flex flex-col-reverse flex-1 py-[16px] px-[20px]">
        {Object.entries(chatData).map(([date, chats]) => {
          return (
            <div key={date}>
              <div className="center sticky top-[6px]">
                <p className="px-[10px] py-[4px] border-[#eee] border-[1px] rounded-full text-[#777] text-[12px]">
                  {date}
                </p>
              </div>
              {chats.map((chat: any, idx: number) => {
                return <Chat key={chat.id} chat={chat} />;
              })}
            </div>
          );
        })}
      </div>
    </Scrollbars>
  );
};
