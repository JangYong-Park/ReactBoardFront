import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용

function BoardRegist() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [memberId, setMemberId] = useState('');
  const navigate = useNavigate(); // navigate 함수 사용

  const handleSubmit = (e) => {
    e.preventDefault();
    // 서버로 전송할 payload
    const payload = {
      title: title,
      content: content,
      memberId: memberId
    };

    axios.post('http://localhost:8080/api/board/regist', payload)
      .then(response => {
        // 등록 성공 시 처리
        alert("게시글이 등록되었습니다.");
        // 입력 폼 초기화 (선택 사항)
        setTitle('');
        setContent('');
        setMemberId('');
        // 목록 페이지로 이동
        navigate("/boardList");
      })
      .catch(err => {
        console.error(err);
        alert("게시글 등록 중 오류 발생");
      });
  };

  return (
    <div>
      <h2>게시글 등록</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label>작성자 ID: </label>
          <input 
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}

export default BoardRegist;
