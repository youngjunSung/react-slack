import React from 'react';
import { TextField, Button } from '@components/index';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <TextField label="이메일 주소" type="email" />
      <TextField label="비밀번호" type="password" />
      <Button text="로그인" />
      <p className="mt-[10px] text-center">
        Slack을 처음 사용하시나요? 
        <Link to="/sign" className="ml-[4px] text-blue-600">
          회원가입
        </Link>
      </p>
    </>
  );
};

export default Login;
