import React from "react";
import "../css/App.css";
import Vote from "../images/vote.png";
import { AiOutlineHome } from "react-icons/ai";
import { LuVote } from "react-icons/lu";
import { TbChecklist } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = ({ setActiveOption }) => {
  return (
    <aside>
      <nav>
        <section className="header">
          <picture>
            <img src={Vote} alt="Logo" />
          </picture>
          <h2>Voting</h2>
        </section>
        <ul>
          <li>
            <Link to="/home">
              <span className="icon">
                <AiOutlineHome />
              </span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/createVoting">
              <span className="icon">
                <LuVote />
              </span>
              <span>Create voting</span>
            </Link>
          </li>
          <li>
            <Link to="/listVoting">
              <span className="icon">
                <TbChecklist />
              </span>
              <span>List Voting</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
