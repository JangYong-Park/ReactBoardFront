import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BoardDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);

  // 로그인한 사용자 ID(예: localStorage에 저장된 ID 사용)
  const loggedInUserId = localStorage.getItem('memberId'); // 가정

  useEffect(() => {
    fetchBoardDetail();
  }, [boardId]);

  const fetchBoardDetail = () => {
    axios.get(`http://localhost:8080/api/board/find?boardId=${boardId}`)
      .then(res => {
        setBoard(res.data.data);
      })
      .catch(err => {
        console.error(err);
        alert("게시글 상세조회 중 오류 발생");
      });
  };

  const handleRecommend = () => {
    axios.post('http://localhost:8080/api/board/good', { boardId: parseInt(boardId) })
      .then(res => {
        alert("추천되었습니다.");
        fetchBoardDetail(); // 추천수 반영을 위해 상세 다시 로드
      })
      .catch(err => {
        console.error(err);
        alert("추천 중 오류 발생");
      });
  };

  const handleModify = () => {
    // 수정 로직
    // 수정 폼을 따로 만들거나 여기서 직접 변경 후 /api/board/modify 요청
    // 여기서는 간단히 제목 변경 후 요청하는 예시
    const newTitle = prompt("새로운 제목을 입력하세요", board.title);
    if(!newTitle) return;
    axios.post('http://localhost:8080/api/board/modify', {
      boardId: parseInt(boardId),
      title: newTitle,
      content: board.content,
      memberId: board.memberId
    })
    .then(res => {
      alert("수정 완료");
      fetchBoardDetail();
    })
    .catch(err => {
      console.error(err);
      alert("수정 중 오류 발생");
    });
  };

  const handleRemove = () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      axios.post('http://localhost:8080/api/board/remove', { boardId: parseInt(boardId) })
        .then(res => {
          alert("삭제 완료");
          navigate('/boardList'); // 삭제 후 리스트로 이동
        })
        .catch(err => {
          console.error(err);
          alert("삭제 중 오류 발생");
        });
    }
  };

  if(!board) return <div>로딩중...</div>;

  return (
    <div style={{ margin: '0 20px' }}>
      <h2>게시글 상세보기</h2>
      <p><b>제목:</b> {board.title}</p>
      <p><b>작성자:</b> {board.memberId}</p>
      <p><b>추천수:</b> {board.boardGood}</p>
      <p><b>작성일:</b> {board.createdAt && board.createdAt.substring(0,10)}</p>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px' }}>
        {board.content}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleRecommend}>추천하기</button>
        {/* 로그인한 사용자와 작성자가 동일한 경우만 수정/삭제 버튼 노출 */}
        {loggedInUserId === board.memberId && (
          <>
            <button onClick={handleModify} style={{ marginLeft: '10px' }}>수정하기</button>
            <button onClick={handleRemove} style={{ marginLeft: '10px' }}>삭제하기</button>
          </>
        )}
        <button onClick={() => navigate('/boardList')} style={{ marginLeft: '10px' }}>목록으로</button>
      </div>
    </div>
  );
}

export default BoardDetail;
