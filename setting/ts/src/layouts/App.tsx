import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LogoSlack } from '@assets/icons/';
import loadable from '@loadable/component';

// 코드 스플리팅
const Login = loadable(() => import('@pages/Login'));
const Sign = loadable(() => import('@pages/Sign'));
const WorkSpace = loadable(() => import('@layouts/WorkSpace'));
const Channel = loadable(() => import('@pages/Channel'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign" element={<Sign />}></Route>
      <Route path="/workspace/channel" element={<Channel />}></Route>
    </Routes>
  );
};

export default App;
