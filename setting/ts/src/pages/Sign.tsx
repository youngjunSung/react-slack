import React, { useState, useCallback } from 'react';
import { TextField, Button } from '@components/index';
import { Link } from 'react-router-dom';

const Sign = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [missmatchError, setMissmatchError] = useState(false);

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [email],
  );

  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    },
    [nickname],
  );

  console.log('렌더링 1')
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMissmatchError(e.target.value !== passwordCheck);
      console.log('password e.target.value : ' + e.target.value)
      console.log('password : ' + password)
      console.log('passwordCheck : ' + passwordCheck)
      // password === passwordCheck ? setMissmatchError(false) : setMissmatchError(true);
    },
    [password, passwordCheck],
  );
  console.log('렌더링 2')

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMissmatchError(e.target.value !== password);
      console.log('passwordCheck e.target.value : ' + e.target.value)
      console.log('password : ' + password)
      console.log('passwordCheck : ' + passwordCheck)
      // password === passwordCheck ? setMissmatchError(false) : setMissmatchError(true);
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
