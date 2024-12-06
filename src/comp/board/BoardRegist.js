import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BoardRegist() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [writer, setWriter] = useState('');    // 최종 memberId
  const [tempNickname, setTempNickname] = useState(''); // 비로그인 상태에서 입력받을 닉네임

  // 컴포넌트가 마운트될 때 localStorage에서 userId 확인
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // 로그인된 상태
      setIsLoggedIn(true);
      setWriter(userId); // 로그인 상태라면 writer는 userId 그대로
    } else {
      // 비로그인 상태
      setIsLoggedIn(false);
      setWriter(''); // 비로그인 상태이므로 아직 writer 결정되지 않음
    }
  }, []);

  const handleSubmit = () => {
    let finalWriter = writer;
    // 비로그인 상태라면 tempNickname을 ""로 감싸서 writer로 사용
    if(!isLoggedIn) {
      finalWriter = `"${tempNickname}"`;
    }

    const payload = {
      title: title,
      content: content,
      memberId: finalWriter
    };

    axios.post("http://localhost:8080/api/board/regist", payload)
      .then(res => {
        alert("게시글이 등록되었습니다.");
        setTitle('');
        setContent('');
      })
      .catch(err => {
        console.error(err);
        alert("게시글 등록 중 오류 발생");
      });
  };

  return (
    <div>
      <h2>게시글 등록</h2>
      <div>
        <label>작성자: </label>
        {isLoggedIn ? (
          // 로그인 상태라면 userId를 그대로 표시 (예: hong)
          <span>{writer}</span>
        ) : (
          // 비로그인 상태라면 닉네임 입력받기
          <input 
            type="text"
            placeholder="닉네임 입력"
            value={tempNickname}
            onChange={(e) => setTempNickname(e.target.value)} 
          />
        )}
      </div>
      <div>
        <label>제목: </label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>내용: </label><br/>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)} 
          rows="5" 
          cols="50"
          required 
        />
      </div>
      <button onClick={handleSubmit}>등록하기</button>
    </div>
  );
}

export default BoardRegist;
