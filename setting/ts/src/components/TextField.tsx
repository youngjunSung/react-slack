import React, { memo } from 'react';

interface TextFieldProps {
  id?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[] | undefined;
}

export const TextField: React.FC<TextFieldProps> = memo(({ id, label, type = 'text', className, onChange, value }) => {
  console.log(`${label} 렌더링!`);
  return (
    <div className={`flex flex-col my-[20px] ${className}`}>
      <label htmlFor={id} className="mb-[4px]">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="p-[10px] border-[1px] border-gray-300 border-solid rounded-[8px]"
        onChange={onChange}
        value={value}
      />
    </div>
  );
});
