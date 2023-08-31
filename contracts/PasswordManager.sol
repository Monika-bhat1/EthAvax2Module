// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PasswordManager {
    mapping(address => string) private passwords;

    event PasswordSaved(address indexed user, string password);
    event PasswordRetrieved(address indexed user, string password);

    function savePassword(string memory password) public {
        passwords[msg.sender] = password;
        emit PasswordSaved(msg.sender, password);
    }

    function getPassword() public view returns (string memory) {
        return passwords[msg.sender];
    }
}
