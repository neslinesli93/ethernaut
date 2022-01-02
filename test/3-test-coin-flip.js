const { expect, assert } = require('chai');

describe('CoinFlip', function () {
  it('should solve the challenge', async function () {
    // Deploy challenge
    const CoinFlip = await ethers.getContractFactory('CoinFlip');
    const challenge = await CoinFlip.deploy();

    // Deploy solver
    const CoinFlipSolver = await ethers.getContractFactory('CoinFlipSolver');
    const solver = await CoinFlipSolver.deploy();

    for (let i = 0; i < 100; i++) {
      await solver.guessFlip(challenge.address);
      await moveTimeAndBlock();

      let wins = await challenge.consecutiveWins();
      if (wins >= 10) {
        console.log('Won 10 times, exiting...');
        break;
      }
    }
  });
});

async function moveTimeAndBlock() {
  const time = 10; // 10 seconds
  const block = await ethers.provider.getBlock('latest');
  await ethers.provider.send('evm_mine', [block.timestamp + time]);
}
