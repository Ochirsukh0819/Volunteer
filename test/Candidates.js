// Import Chai assertion library
const { expect } = require("chai");

// Import ethers for interacting with the contract
const { ethers } = require("hardhat");

describe("Candidates", function () {
  let formContract;

  // Deploy the contract before each test
  beforeEach(async () => {
    const Candidates = await ethers.getContractFactory("Candidates");
    formContract = await Candidates.deploy();
  });

  it("should be save candidates data", async function () {
    await formContract.saveOptionData("Ochirsukh", "Student1");
    await formContract.saveOptionData("Hulan", "Student2");
    await formContract.saveCandidateData(
      "Оюутны зөвлөл сонгох санал",
      "Оюутны зөвлөл",
      "2023-08-19",
      "2024-08-19"
    );
    const optionCount = await formContract.getOptionData();
    expect(optionCount.length).to.equal(2);
    const candidates = await formContract.getCandidateData();
    console.log("Candidates: ", candidates[0].options[1].description);
    expect(candidates[0].options[1].title).to.equal("Hulan");

    console.log("Test1: ", candidates);

    await formContract.saveOptionData("test1", "test2");
    await formContract.saveOptionData("test2", "test3");
    await formContract.saveCandidateData(
      "Test",
      "Test<3",
      "2023-08-19",
      "2024-08-19"
    );

    const testCandidate = await formContract.getCandidateData();
    console.log("Test2: ", testCandidate[testCandidate.length - 1]);
  });
});
