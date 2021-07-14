import React, { useContext, useState, useEffect } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";

const EditDeleteComments = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.preventDefault();

    if (text) {
      await dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" className="edit-comment-form" onSubmit={handleEdit}>
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            edit
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete-comment" />
            </span>
            <input type="submit" value="valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComments;
