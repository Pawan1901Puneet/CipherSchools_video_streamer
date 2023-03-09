import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Comments = ({ videoId,userImg }) => {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = () => {
      fetch('http://localhost:8080/comments/' + videoId,{
        method : 'GET',
        credentials : 'include'
      })
        .then(res => res.json())
        .then(result => {
          setComments(result.comments);
        })
        .catch(err => console.log(err));
    }

    fetchComments();

  }, [videoId]);

  const newCommentChange = (e) => {
    setNewComment(e.target.value);
  }

  const postComment = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/comment/'+videoId,{
      method : 'POST',
      credentials : 'include',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        desc : newComment
      })
    }).then(res => res.json())
    .then(result => {
      setComments((prev) => ([
        result.comment,
        ...prev
      ]));
      setNewComment('');
    }).catch(err => console.log(err));
  }


  return (
    <Container>
      <NewComment>
        <Avatar src={userImg} />
        <Input placeholder="Add a comment..." value={newComment} onChange={newCommentChange} />
        <Button onClick={postComment} disabled={newComment.length === 0}>Comment</Button>
      </NewComment>
      {comments.map(comment => {
        return <Comment key={comment._id} comment={comment} />
      })}
    </Container>
  );
};

export default Comments;
