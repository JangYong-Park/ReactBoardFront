import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('title'); // 기본값: 제목 검색

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = (params = {}) => {
    // params를 통해 keyword나 searchType을 전달할 수 있습니다.
    // 백엔드에서 searchType 별로 검색을 처리하도록 수정되어 있어야 합니다.
    // 만약 백엔드에서 searchType 파라미터를 아직 처리하지 않는다면,
    // keyword만 전달하거나 프론트에서 검색 필터링을 구현할 수 있습니다.
    
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
    // 검색 버튼 클릭 시 keyword, searchType을 기반으로 다시 리스트를 불러옵니다.
    fetchBoards({ keyword, searchType });
  };

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

      {/* 검색 영역: input - select - button */}
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
          style={{ marginLeft: '5px', marginRight: '5px' }}
        >
          <option value="author">작성자</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <button onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
}

export default BoardList;
