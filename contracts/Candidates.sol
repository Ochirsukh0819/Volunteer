// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct Option {
    string title;
    string description;
    uint256 vote;
}

contract Candidates {

    struct CandidateData {
        string description;
        string title;
        string stime;
        string ftime;
        Option[] options;
        uint256 optionLen;
    }

    mapping(uint256 => Option) public options;
    uint256 public optionCount = 0;
    uint256 public saveOption = 0;

    mapping(uint256 => CandidateData) public candidates;
    uint256 public candidateCount = 0; 

    function saveOptionData(string memory _title, string memory _description) public {
        Option memory newOptionData = Option(_title, _description, 0);
        options[optionCount] = newOptionData;
        optionCount++; 
    }

    function getOptionDataCount() public view returns (uint256) {
        return optionCount;
    }

    function saveCandidateData(string memory _title, string memory _description, string memory _stime, string memory _ftime) public {
        CandidateData storage newCandidateData = candidates[candidateCount];
        newCandidateData.description = _description;
        newCandidateData.title = _title;
        newCandidateData.stime = _stime;
        newCandidateData.ftime = _ftime;
        newCandidateData.optionLen = optionCount;

        for (uint256 i = 0; i < optionCount; i++) {
            newCandidateData.options.push(options[i]);
        }

        for(uint256 i = 0; i < optionCount; i++){
            delete options[i];
        }

        saveOption = optionCount; 
        optionCount = 0;
        candidateCount++;
    }

    function getCandidateDataCount() public view returns (uint256) {
        return candidateCount;
    }

    function getOptionData() public view returns (Option[] memory) {
        Option[] memory allOptions = new Option[](saveOption);
        for (uint256 i = 0; i < saveOption; i++) {
            allOptions[i] = options[i];
        }
        return allOptions;
    }

    
    function getCandidateData() public view returns (CandidateData[] memory) {
        CandidateData[] memory allCandidates = new CandidateData[](candidateCount);
        for (uint256 i = 0; i < candidateCount; i++) {
            allCandidates[i] = candidates[i];
        }
        return allCandidates;
    }
}
