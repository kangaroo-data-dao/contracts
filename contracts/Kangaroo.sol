// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./KDCoin.sol";
import { MarketAPI } from "@zondax/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
import { MarketTypes } from "@zondax/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol";

contract Kangaroo {

  struct Submission {
    uint id;
    string name; 
    uint dealId;
    address spAddress;
    uint totalVotes;
    uint yesVotes;
    uint noVotes;
    bool valid;
    uint status;
    uint size;
    bytes cid;
  }

  IERC20 public token;
  uint8 public stage; 
  mapping(address => bool) public members;
  mapping(uint => Submission) public submissions;
  
  modifier ownerOnly() {
    require(msg.sender == owner, "Non Admin Call");
    _;
  }

  modifier memberOnly() {
    require(members[msg.sender], "Member Gated");
    _;
  }

  address public owner;

  constructor(address tokenAddress, address[] memory newMembers) {
    owner = msg.sender;
    token = IERC20(address(tokenAddress));
    uint memberLen = newMembers.length;
    for(uint i=0; i<memberLen; i++) {
      members[newMembers[i]] = true;
    }
    stage = 0;
  }

  // Join this instance of the DataDAO, if the token criteria is met
  function join() public {
    require(token.balanceOf(msg.sender) > 0, "Insufficient DAO Tokens");
    require(stage == 0, "Please join in the next hop");
    members[msg.sender] = true;
  }

  function createSubmission(uint id, string memory name, address sp, bytes memory cid) public memberOnly {
    // TODO: Add a repeat check
    submissions[id] = Submission({
      id: id,
      name: name,
      dealId: 0,
      spAddress: sp,
      totalVotes: 0,
      yesVotes: 0,
      noVotes: 0,
      valid: true,
      status: 1,
      cid: cid,
      size: 0
    });
  }

  function getTokenAddress() public memberOnly view returns(address) {
    return address(token);
  }

  // TODO: Make this quadratic voting
  function voteForSubmission(uint id, bool votingFor) public memberOnly {
    // Ensure that the voter has enough tokens to vote
    uint votePower = token.balanceOf(msg.sender);
    if(votingFor) {
      submissions[id].yesVotes += votePower;
    }
     else {
      submissions[id].noVotes += votePower;
     }
  }

  function endVoting(uint id) public memberOnly {
    submissions[id].status = 2;
  }

  // Miners can submit their interest and submit proofs of storage as well
  function submitMinerProof(uint id, uint64 dealId) public returns(MarketTypes.GetDealDataCommitmentReturn memory) {
    require(msg.sender == submissions[id].spAddress);
    MarketTypes.GetDealDataCommitmentReturn memory commitmentRet = MarketAPI.getDealDataCommitment(dealId);
    submissions[id].dealId = dealId;

    return commitmentRet;
    // Ensure that the size matches
    // require(submissions[id].size == commitmentRet.size);


  }
}

