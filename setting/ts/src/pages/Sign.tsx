import React, { useState, useCallback } from 'react';
import { TextField, Button } from '@components/index';
import { Link } from 'react-router-dom';
import { useInput } from '@hooks/useInput';

const Sign = () => {
  const [email, setEmail, onChangeEmail] = useInput('');
  const [nickname, setNickname, onChangeNickname] = useInput<string>('');
  const [password, setPassword] = useInput<string>('');
  const [passwordCheck, setPasswordCheck] = useInput<string>('');
  const [missmatchError, setMissmatchError] = useInput(false);
  
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMissmatchError(e.target.value !== passwordCheck);
    },
    [password, passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMissmatchError(e.target.value !== password);
    },
    [password, passwordCheck],
  );

  return (
    <>
      <TextField label="이메일 주소" type="email" value={email} onChange={onChangeEmail} />
      <TextField label="닉네임" value={nickname} onChange={onChangeNickname} />
      <TextField label="비밀번호" type="password" value={password} onChange={onChangePassword} />
      <TextField label="비밀번호 확인" type="password" value={passwordCheck} onChange={onChangePasswordCheck} />
      {missmatchError && <p className='mb-[20px] mt-[-10px] text-red-500 font-normal'>비밀번호가 일치하지 않습니다.</p>}
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
