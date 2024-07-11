import React from 'react';

interface ButtonProps {
  className?: string;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({className, text}) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center min-h-[54px] px-[10px] w-full bg-[#5c2c5d] text-white rounded-[8px] text-[16px] font-bold ${className}`}
    >
      {text}
    </button>
  );
};
