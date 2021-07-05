import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();

  const dispatch = useDispatch()

  const userData = useSelector((state) => state.userReducer);


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append("name", userData.pseudo)
    data.append("userId", userData._id)
    data.append("file", file)

    dispatch(uploadPicture(data, userData._id))
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        name="file"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
