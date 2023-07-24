import React, { useState } from "react";
import "../css/App.css";
import { AiOutlineClose } from "react-icons/ai";
import FormAbi from "../artifacts/contracts/Candidates.sol/Candidates.json";
import { Contract, ethers } from "ethers";

function CreateVoting({ votes, setVotes }) {
  let contract;
  // useState
  const [activeTab, setActiveTab] = useState(1);
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState([
    { title: "", description: "", vote: 0 },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stime, setStime] = useState("");
  const [ftime, setFtime] = useState("");

  const handleCtitleChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].title = event.target.value;
    setOptions(newOptions);
  };

  const handleCdescription = (index, event) => {
    const newOptions = [...options];
    newOptions[index].description = event.target.value;
    setOptions(newOptions);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStimeChange = (e) => {
    setStime(e.target.value);
  };

  const handleFtimeChange = (e) => {
    setFtime(e.target.value);
  };

  const addOption = async () => {
    setOptions([...options, { title: "", description: "", vote: 0 }]);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async () => {
    try {
      console.log("Options: ", options);
      setModal(!modal);
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log("********");
      const signer = await provider.getSigner();

      const contractAddress = "0x61F7f5A0702E74f27c573224f73d119c0057A11E";
      contract = new Contract(contractAddress, FormAbi.abi, signer);

      for (const option of options) {
        await contract.saveOptionData(option.title, option.description);
      }

      await contract.saveCandidateData(title, description, stime, ftime);

      const allCandidate = await contract.getCandidateData();

      console.log("All data: ", allCandidate);

      const newVote = {
        description,
        title,
        stime,
        ftime,
        options,
        optionsLength: options.length,
      };
      setVotes([...votes, newVote]);
      console.log("Votes: ", votes);

      setDescription("");
      setTitle("");
      setStime("");
      setFtime("");
      setOptions([]);

      alert("Data saved successfully!");
    } catch (error) {
      console.log("Error messaging: ", error);
    }
  };

  return (
    <main>
      <section className="content">
        <section className="tab-nav">
          <ul>
            <li
              className={activeTab === 1 ? "active" : ""}
              onClick={() => handleTabClick(1)}
            >
              Create Voting
            </li>
            <li
              className={activeTab === 2 ? "active" : ""}
              onClick={() => handleTabClick(2)}
            >
              All Voting
            </li>
          </ul>
        </section>
        <section className="tab-content">
          {activeTab === 1 && (
            <section className="tab1">
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
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {votes.map((vote, index) => (
                        <tr key={index}>
                          <td>{vote.description}</td>
                          <td>{vote.title}</td>
                          <td>{vote.stime}</td>
                          <td>{vote.ftime}</td>
                          <td>{vote.optionsLength}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </section>
              <button onClick={toggleModal}>Add Vote</button>
            </section>
          )}
          {activeTab === 2 && (
            <section className="tab1">
              <h2>All Voting</h2>
              <section className="votes">
                <section className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Title</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {votes.map((vote, index) => (
                        <tr key={index}>
                          <td>{vote.description}</td>
                          <td>{vote.title}</td>
                          <td>{vote.stime}</td>
                          <td>{vote.ftime}</td>
                          <td>{vote.optionsLength}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </section>
            </section>
          )}
        </section>
      </section>
      {modal && (
        <section className="model">
          <section className="model-content">
            <span className="closeIcon" onClick={toggleModal}>
              <AiOutlineClose />
            </span>
            <section className="staticInput">
              <input
                type="text"
                className="name"
                placeholder="description"
                value={description}
                onChange={handleDescriptionChange}
              />
              <input
                type="name"
                placeholder="title"
                value={title}
                onChange={handleTitleChange}
              />

              <input
                type="date"
                placeholder="stime"
                value={stime}
                onChange={handleStimeChange}
              />
              <input
                type="date"
                placeholder="ftime"
                value={ftime}
                onChange={handleFtimeChange}
              />
              <button onClick={addOption}>Add option</button>
            </section>
            <section className="dynamicInput">
              <h2>Options</h2>

              <section className="inputs">
                {options.map((option, index) => (
                  <div key={index} className="aa">
                    <input type="file" />
                    <input
                      type="name"
                      placeholder="title"
                      value={options.title}
                      onChange={(e) => handleCtitleChange(index, e)}
                    />
                    <input
                      type="text"
                      placeholder="description"
                      value={options.description}
                      onChange={(e) => handleCdescription(index, e)}
                    />
                  </div>
                ))}
              </section>
              <button onClick={handleSubmit}>Submit</button>
            </section>
          </section>
        </section>
      )}
    </main>
  );
}

export default CreateVoting;
