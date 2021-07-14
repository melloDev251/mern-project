import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import ReactTooltip from "react-tooltip";

const LogOut = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => {
        removeCookie("jwt");
      })
      .catch((err) => {
        console.log(err);
      });

    window.location = "/";
  };
  return (
    <>
      <li onClick={logout}>
        <img src="./img/icons/logout.svg" alt="logout" data-tip="Se déconnecter" />
        <ReactTooltip
              place="bottom"
              type="dark"
              textColor="dark"
              effect="float"
              className="tools"
              backgroundColor="white"
              borderColor="black"
              border="5px true"
            />
      </li>
    </>
  );
};

export default LogOut;
