import React, { useState } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function ListVote({ votes }) {
  const [searchValue, setSearchValue] = useState("");
  // search
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  console.log("hah test hiij ban: ", votes);

  // search value hvsnegtes oloh vildel (title haih)

  const filterValue = votes.filter((vote) => {
    return vote.title.includes(searchValue);
  });

  return (
    <main>
      <section className="list-content">
        <section className="search">
          <span className="search-icon">
            <BsFillSearchHeartFill />
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </section>
        <section className="list-part">
          <section className="list1 ">
            <h2>Voting</h2>
            <section className="votes">
              <section className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Title</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Candidates</th>
                      <th>Vote</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterValue.map((vote, index) => (
                      <tr key={index}>
                        <td>{vote.description}</td>
                        <td>{vote.title}</td>
                        <td>{vote.stime}</td>
                        <td>{vote.ftime}</td>
                        <td>{vote.optionsLength}</td>
                        <td>
                          <Link to="/vote" state={{ vote: vote }}>
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}

export default ListVote;
