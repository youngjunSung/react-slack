import React from 'react';
import { TextField, Button } from '@components/index';
import { Link } from 'react-router-dom';

const Sign = () => {
  return (
    <>
      <TextField label="이메일 주소" type="email" />
      <TextField label="닉네임" />
      <TextField label="비밀번호" type="password" />
      <TextField label="비밀번호 확인" type="password" />
      <Button text="회원가입" />
      <p className="mt-[10px] text-center">
        이미 계정이 있으신가요? 
        <Link to="/login" className="ml-[4px] text-blue-600">
          로그인
        </Link>
      </p>
    </>
  );
};

export default Sign;
