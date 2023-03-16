// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./Kangaroo.sol";
import "./KDCoin.sol";

contract KangarooFactory {
  event ContractCreated(address newAddress);

  // List of Kangaroos created with the factory
  mapping(string => address) kangaroos;

  // Create a Kangaroo Smart Contract
  function createKangaroo(string memory id, string memory tokenName, address[] memory memberList, uint[] memory distributionList, uint256 tokenSupply) public {
    KDCoin coin = new KDCoin(tokenName, tokenSupply, memberList, distributionList);
    Kangaroo kangaroo = new Kangaroo(address(coin), memberList); 
    kangaroos[id] = address(kangaroo);
  }

  // Get back the created Kangaroo
  function getKangaroo(string memory id) public view returns (address) {
    return kangaroos[id];
  }
}
