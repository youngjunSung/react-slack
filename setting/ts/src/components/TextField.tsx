import React from 'react';

interface TextFieldProps {
  id?: string;
  label?: string;
  type?: string;
  className?: string;
}

export const TextField: React.FC<TextFieldProps> = ({id, label, type = 'text', className}) => {
  return (
    <div className={`flex flex-col my-[20px] ${className}`}>
      <label htmlFor={id} className='mb-[4px]'>{label}</label>
      <input
        type={type}
        id={id}
        className="p-[10px] border-[1px] border-gray-300 border-solid rounded-[8px]"
      />
    </div>
  );
};
