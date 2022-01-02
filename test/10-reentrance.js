const { expect, assert } = require('chai');
const { BigNumber } = require('ethers');

describe('Reentrance', function () {
  it('should solve the challenge', async function () {
    const [owner] = await ethers.getSigners();

    // Deploy challenge
    const Reentrance = await ethers.getContractFactory('Reentrance');
    const challenge = await Reentrance.deploy();
    await owner.sendTransaction({ to: challenge.address, value: 1 });

    const oldBalance = await ethers.provider.getBalance(challenge.address);
    expect(oldBalance).to.equal(BigNumber.from(1));

    // Deploy solver
    const ReentranceSolver = await ethers.getContractFactory('ReentranceSolver');
    const solver = await ReentranceSolver.deploy();

    await solver.solveChallenge(challenge.address, { value: 1 });
    const newBalance = await ethers.provider.getBalance(challenge.address);
    expect(newBalance).to.equal(BigNumber.from(0));
  });
});
