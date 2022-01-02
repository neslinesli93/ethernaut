const { expect, assert } = require('chai');
const { BigNumber } = require('ethers');

describe('Elevator', function () {
  it('should solve the challenge', async function () {
    // Deploy challenge
    const Elevator = await ethers.getContractFactory('Elevator');
    const challenge = await Elevator.deploy();
    expect(await challenge.top()).to.equal(false);

    // Deploy solver
    const ElevatorSolver = await ethers.getContractFactory('ElevatorSolver');
    const solver = await ElevatorSolver.deploy();

    await solver.solveChallenge(challenge.address);
    expect(await challenge.top()).to.equal(true);
  });
});
