import React, { useRef, useEffect } from 'react';
import autosize from 'autosize';

interface ChatBoxProps {
  chat: string;
  onSubmit: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}

export const ChatBox = ({ chat, onSubmit, onChangeChat, placeholder }: ChatBoxProps) => {
  const RefTextarea = useRef<HTMLTextAreaElement>(null);
  const onKeyDownChat = (e: React.KeyboardEvent) => {
    // console.log(e)
    if (e.key === 'Enter' && e.shiftKey === false) {
      console.log(e);
      onSubmit(e);
    }
  };
  useEffect(() => {
    if (RefTextarea.current) {
      autosize(RefTextarea.current);
    }
  }, []);
  return (
    <div className="px-[20px] pb-[20px]">
      <textarea
        rows={1} // autosize 플러그인 사용 시 기본 높이 제어 속성
        ref={RefTextarea}
        value={chat}
        onChange={onChangeChat}
        onKeyDown={onKeyDownChat}
        placeholder={placeholder}
        className="resize-none p-[10px] border-[1px] border-gray-300 border-solid w-full rounded-[8px]"
      ></textarea>
    </div>
  );
};
