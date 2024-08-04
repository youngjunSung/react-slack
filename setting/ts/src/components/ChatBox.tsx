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
  useEffect(() => {
    if (RefTextarea.current) {
      autosize(RefTextarea.current);
    }
  }, []);
  return (
    <div className="px-[20px] pb-[20px]">
      <textarea
        rows={1}
        ref={RefTextarea}
        value={chat}
        onChange={onChangeChat}
        placeholder={placeholder}
        className="resize-none p-[10px] border-[1px] border-gray-300 border-solid w-full rounded-[8px]"
      ></textarea>
    </div>
  );
};
