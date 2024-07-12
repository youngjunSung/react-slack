import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { LogoSlack } from '@assets/icons/';
import loadable from '@loadable/component';

// 코드 스플리팅
const Login = loadable(() => import('@pages/Login'));
const Sign = loadable(() => import('@pages/Sign'));

const App = () => {
  return (
    <div className="max-w-[400px] mx-auto px-[20px]">
      <h1 className="flex justify-center pt-[60px] pb-[20px]">
        <LogoSlack />
        <span className="blind">Slack</span>
      </h1>
      <Switch>
        <Redirect exact path="/" to="/login"></Redirect>
        <Route path="/login" component={Login}></Route>
        <Route path="/sign" component={Sign}></Route>
      </Switch>
    </div>
  );
};

export default App;
