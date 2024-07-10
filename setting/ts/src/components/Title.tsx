import React from 'react';

interface MyComponentProps {
  title: string;
  className?: string;
}

export const Title: React.FC<MyComponentProps> = ({ title, className }) => {
  return <h1 className={className}>{title}</h1>;
};
