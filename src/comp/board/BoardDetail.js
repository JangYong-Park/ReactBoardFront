import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BoardDetail.module.css';

function BoardDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);

  const loggedInUserId = localStorage.getItem('userId'); 

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
        fetchBoardDetail();
      })
      .catch(err => {
        console.error(err);
        alert("추천 중 오류 발생");
      });
  };

  const handleModify = () => {
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
          navigate('/boardList');
        })
        .catch(err => {
          console.error(err);
          alert("삭제 중 오류 발생");
        });
    }
  };

  if(!board) return <div className={styles.loading}>로딩중...</div>;

  const canEditOrDelete = (loggedInUserId === board.memberId) && (board.memberId !== 'anonymous');

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>게시글 상세보기</h2>

      <div className={styles.infoGroup}>
        <div className={styles.infoItem}>
          <span className={styles.label}>제목:</span>
          <span className={styles.value}>{board.title}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>작성자:</span>
          <span className={styles.value}>{board.memberId}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>추천수:</span>
          <span className={styles.value}>{board.boardGood}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>작성일:</span>
          <span className={styles.value}>{board.createdAt && board.createdAt.substring(0,10)}</span>
        </div>
      </div>

      <div className={styles.content}>
        {board.content}
      </div>

      <div className={styles.buttonContainer}>
        <button className={`${styles.button} ${styles.recommendButton}`} onClick={handleRecommend}>추천하기</button>
        {canEditOrDelete && (
          <>
            <button className={`${styles.button} ${styles.modifyButton}`} onClick={handleModify}>수정하기</button>
            <button className={`${styles.button} ${styles.deleteButton}`} onClick={handleRemove}>삭제하기</button>
          </>
        )}
        <button className={`${styles.button} ${styles.backButton}`} onClick={() => navigate('/boardList')}>목록으로</button>
      </div>
    </div>
  );
}

export default BoardDetail;
