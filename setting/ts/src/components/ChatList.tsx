import React, { useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IUser, IChat, IDM } from '@typings/db';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import Scrollbars from 'react-custom-scrollbars';
import regexifyString from 'regexify-string';

export const ChatList = ({ chatData }: { chatData: IChat[] | IDM[] | undefined }) => {
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
        {chatData?.map((e: any, idx: number) => {
          return (
            <div key={idx} className="flex items-start">
              <button type="button" className="mt-[4px] flex items-center justify-center rounded-[4px] overflow-hidden">
                <img src={gravatar.url(e.Sender.email, { s: '24px', d: 'retro' })} alt="" />
              </button>
              <div className="ml-[6px]">
                <div className="flex items-center mb-[4px]">
                  <p className="text-[16px] text-black font-[600] mr-[4px]">{e.Sender.nickname}</p>
                  <p className="text-[12px] text-gray-500 font-[400]">{dayjs(e.createdAt).format('h:mm A')}</p>
                </div>
                <p>{e.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Scrollbars>
  );
};
