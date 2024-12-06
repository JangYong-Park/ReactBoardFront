// src/comp/board/BoardList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BoardList() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/board/list")
      .then(response => {
        const res = response.data;
        if(res.code === '500') {
          alert("서버에서 에러가 발생했습니다.");
        } else {
          setBoards(res.data || []);
        }
      })
      .catch(err => {
        console.error(err);
        alert("데이터 로딩 중 오류 발생");
      });
  }, []);

  return (
    <div>
      <h2>게시판 리스트</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>좋아요</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boards.map(board => (
            <tr key={board.boardIdx}>
              <td>{board.boardIdx}</td>
              <td>{board.title}</td>
              <td>{board.memberId}</td>
              <td>{board.boardGood}</td>
              <td>{board.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardList;
