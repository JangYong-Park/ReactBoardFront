import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('title'); 

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = (params = {}) => {
    axios.get("http://localhost:8080/api/board/list", { params })
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
  };

  const handleSearch = () => {
    fetchBoards({ keyword, searchType });
  };

  return (
    <div style={{ margin: '0 20px' }}>
      <h2>게시판 리스트</h2>
      <table border="1" width="100%">
        <colgroup>
          <col style={{ width: '9%' }} />
          <col style={{ width: '45%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '9%' }} />
          <col style={{ width: '18%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>추천수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boards.map(board => (
            <tr key={board.boardIdx}>
              <td>{board.boardIdx}</td>
              {/* 제목 클릭 시 상세페이지로 이동 */}
              <td><Link to={`/boardDetail/${board.boardIdx}`}>{board.title}</Link></td>
              <td>{board.memberId}</td>
              <td>{board.boardGood}</td>
              {/* createdAt이 '2024-12-06T14:48:22' 형태라면 substring(0,10)으로 '2024-12-06' 추출 */}
              <td>{board.createdAt 
    ? board.createdAt.substring(0,10) + " / " + board.createdAt.substring(11,16) 
    : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 검색 영역 */}
      <div style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)} 
          placeholder="검색어를 입력하세요"
        />
        <select 
          value={searchType} 
          onChange={(e) => setSearchType(e.target.value)} 
          style={{ marginLeft: '10px', marginRight: '10px' }}
        >
          <option value="author">작성자</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <button onClick={handleSearch}>검색</button>
      </div>

      {/* 글쓰기 버튼 */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/boardRegist">
          <button>글쓰기</button>
        </Link>
      </div>
    </div>
  );
}

export default BoardList;
