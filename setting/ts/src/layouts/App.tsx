import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Title } from '@components/Title';
import loadable from '@loadable/component';

// 코드 스플리팅
const Login = loadable(() => import('@pages/Login'));
const Sign = loadable(() => import('@pages/Sign'));

const App = () => {
  const obj = {
    a: 123,
  };
  return (
    <div>
      초기 세팅입니다
      <Title
        title="Title 컴포넌트의 타이틀"
        className="bg-slate-500 text-[24px] pt-[20px]"
      />
      <Link className='mx-[10px]' to="/">/</Link>
      <Link className='mx-[10px]' to="/login">로그인</Link>
      <Link className='mx-[10px]' to="/sign">회원가입</Link>
      <Switch>
        <Redirect exact path='/' to='/login'></Redirect>
        <Route path='/login' component={Login}></Route>
        <Route path='/sign' component={Sign}></Route>
      </Switch>
      {/* <Redirect exact path="/" to="/"></Redirect>
      <Route path="/login" component={Login}></Route>
      <Route path="/sign" component={Sign}></Route> */}
    </div>
  );
};

export default App;
