import React, { useState } from "react";
import "../css/App.css";
import Candidate1 from "../images/bill_gates.jpg";
import { useLocation } from "react-router-dom";

function Vote() {
  const location = useLocation();
  const { vote } = location.state;
  console.log("Vote: ", vote);
  const [selectVote, setSelectvote] = useState("");
  const [overallVote, setOverallvote] = useState(vote);

  const handleSelectvote = (e) => {
    setSelectvote(e.target.value);
  };

  console.log("SelectedVote: ", selectVote);

  const hah = () => {
    const updatedVoteData = {
      ...overallVote,
      options: overallVote.options.map((candidate) => {
        if (candidate.title === selectVote) {
          console.log("******************");
          return {
            ...candidate,
            vote: candidate.vote + 1,
          };
        }
        return candidate;
      }),
    };
    setOverallvote(updatedVoteData);
  };

  return (
    <main>
      <section className="titles">
        <h2>{vote.title}</h2>
        <section className="times">
          <p>Эхлэсэн хугацаа: {vote.stime} </p>
          <p>Дуусах хугацаа: {vote.ftime}</p>
        </section>
      </section>
      <section className="Candidates">
        {overallVote.options.map((candidate, index) => (
          <article key={index}>
            <picture>
              <img src={Candidate1} alt="Candidates" />
            </picture>
            <h2>{candidate.title}</h2>
            <p>Vote: {candidate.vote}</p>
          </article>
        ))}
      </section>
      <section className="giveVote">
        <h2>Voting section: </h2>
        <select
          name="cars"
          id="cars"
          onChange={handleSelectvote}
          value={selectVote}
        >
          {overallVote.options.map((candidate, index) => (
            <option key={index} value={candidate.title}>
              {candidate.title}
            </option>
          ))}
        </select>
      </section>
      <section className="buttonVote">
        {" "}
        <button onClick={hah}>Vote</button>
      </section>
    </main>
  );
}

export default Vote;
