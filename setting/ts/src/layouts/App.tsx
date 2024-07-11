import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { TextField, Button } from '@components/index';
import { LogoSlack } from '@assets/icons/';
import loadable from '@loadable/component';

// 코드 스플리팅
const Login = loadable(() => import('@pages/Login'));
const Sign = loadable(() => import('@pages/Sign'));

const App = () => {
  const obj = {
    a: 123,
  };
  return (
    <div className="max-w-[400px] mx-auto">
      <div className="flex justify-center py-[20px]">
        <LogoSlack />
      </div>
      <Switch>
        <Redirect exact path="/" to="/login"></Redirect>
        <Route path="/login" component={Login}></Route>
        <Route path="/sign" component={Sign}></Route>
      </Switch>
    </div>
  );
};

export default App;
