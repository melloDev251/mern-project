import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import FollowHandler from "../Profil/FollowHandler";
import { isEmpty, timeStampParser } from "../Utils";
import EditDeleteComments from "./EditDeleteComments";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, userData.pseudo, text))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };
  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3> {comment.commenterPseudo} </h3>
                  {
                    comment.commenterId !== userData._id && (
                      <FollowHandler idToFollow={comment.commenterId} type={"card"} />
                    )
                  }
                </div>
                <span> {timeStampParser(comment.timestamp)} </span>
              </div>
              <p> {comment.text} </p>
              <EditDeleteComments comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}

      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Leave a comment here !"
            autoComplete="off"
          />
          <br />
          <input type="submit" value="Send" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
