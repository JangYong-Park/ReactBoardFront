import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BoardRegist.module.css';
import { Navigate } from 'react-router-dom';

function BoardRegist() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [writer, setWriter] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // 로그인된 상태
      setIsLoggedIn(true);
      setWriter(userId);
    } else {
      // 비로그인 상태: 익명 계정 사용
      setIsLoggedIn(false);
      setWriter('anonymous');
    }
  }, []);

  const handleSubmit = () => {
    const payload = {
      title: title,
      content: content,
      memberId: writer // 로그인 안되어 있으면 anonymous 사용
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
    <div className={styles.container}>
      <h2 className={styles.header}>게시글 등록</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>작성자</label>
        {isLoggedIn ? (
          <div className={styles.writerDisplay}>{writer}</div>
        ) : (
          <div className={styles.writerDisplay}>익명(anonymous)</div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>제목</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input} 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>내용</label>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)} 
          rows="5" 
          className={styles.textarea}
          required 
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.submitButton} onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}

export default BoardRegist;
