import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import LogOut from "./Log/LogOut";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/pose.png" alt="img-logo" />
              <h3>Wesh</h3>
            </div>
          </NavLink>
        </div>

        {uid ? (
          <ul>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5>Bienvenue {userData.pseudo} </h5>
              </NavLink>
            </li>
            <LogOut />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/profil">
                <img src="/img/icons/login.svg" alt="login" data-tip="Vous n'avez pas de compte ? Inscrivez dès maintenant ! " />
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
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
