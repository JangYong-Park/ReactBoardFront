import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Calc1 from './comp/calc/study01'

import Inp1 from './comp/inp/input01'
import Oup1 from './comp/inp/output01'
import Ref from './comp/inp/Ref01'

import ProJoin from './comp/pro/Join'
import ProLogin from './comp/pro/Login'
import ProItemList from './comp/pro/ItemList'

import Ax1 from './comp/ax/ax01'

// 12.06 이후 추가
import BoardList from './comp/board/BoardList'
import BoardRegist from './comp/board/BoardRegist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <About />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/cal1"} element={<Calc1 />} />

          <Route path={"/inp1"} element={<Inp1 />} />
          <Route path={"/oup1"} element={<Oup1 />} />
          <Route path={"/ref1"} element={<Ref />} />

          <Route path={"/pro1"} element={<ProJoin />} />
          <Route path={"/login"} element={<ProLogin />} />
          <Route path={"/itemList"} element={<ProItemList />} />

          <Route path={"/ax1"} element={<Ax1 />} />

          {/* 12.06 게시판 기능 추가 */}
          <Route path={"/boardList"} element={<BoardList />} />
          <Route path={"/boardRegist"} element={<BoardRegist />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

function About() {
  return (
    <div style={{border: '2px blue solid'}}>
      <Link to="/">Home으로 이동</Link>
    </div>
  )
}

function Home() {
  return(
    <div>
      <h1>Start Home</h1>
      <Link to="/about">About으로 이동</Link><br/>
      <Link to="/cal1">Cal1로 이동하기</Link><br/>

      <h4>데이터 옮기기</h4>
      <Link to="/inp1">데이터 입력</Link><br/>
      <Link to="/oup1">데이터 출력</Link><br/>
      <Link to='/ref1'>Ref 사용하기</Link>

      <h4>Axios</h4>
      <Link to="/ax1">AXIOS 사용</Link><br/>

      <h4>기능</h4>
      <Link to="/pro1">회원가입 창</Link><br/>
      <Link to="/login">로그인</Link><br/>
      <Link to="/itemList">아이템 리스트</Link><br/>

      {/* 게시판 기능 링크 추가 */}
      <h3>게시판 기능</h3>
      <Link to="/boardList">게시판</Link> <br/>
      <Link to="/boardRegist">게시글 등록</Link>


    </div>
  )
}

export default App;
