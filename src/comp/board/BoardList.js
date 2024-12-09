import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './BoardList.module.css';

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

  const handleLogout = () => {
    // 로그아웃: localStorage에서 로그인 정보 제거
    localStorage.removeItem('userId');
    localStorage.removeItem('auto');
    // 페이지 새로고침
    window.location.reload();
  };

  return (
    <div className={styles.boardListContainer}>
      <h2 className={styles.boardListHeader}>게시판 리스트</h2>
      <table className={styles.boardTable} border="1">
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
              <td><Link to={`/boardDetail/${board.boardIdx}`}>{board.title}</Link></td>
              <td>{board.memberId}</td>
              <td>{board.boardGood}</td>
              <td>
                {board.createdAt 
                  ? `${board.createdAt.substring(0,10)} / ${board.createdAt.substring(11,16)}`
                  : ''}
              </td>
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

      {/* 글쓰기 & 로그아웃 버튼 */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/boardRegist">
          <button>글쓰기</button>
        </Link>
        {/* 로그인 상태일 때만 로그아웃 버튼 표시 */}
        {localStorage.getItem('userId') && (
          <button onClick={handleLogout} className={styles.logoutButton}>로그아웃</button>
        )}
      </div>
    </div>
  );
}

export default BoardList;
