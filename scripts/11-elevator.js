const { ethers } = require('hardhat');

const CHALLENGE_ADDRESS = '0x26B9ACB4664D906D4651d7130eAb87AeFdF40F9a';

const DEPLOY = false;
const SOLVER_ADDRESS = '0xbC82a3963898c2C02C64C844E0e925bb412FeD42';

async function main() {
  const Elevator = await ethers.getContractFactory('Elevator');
  const challenge = await Elevator.attach(CHALLENGE_ADDRESS);

  const ElevatorSolver = await ethers.getContractFactory('ElevatorSolver');

  let solver;
  if (DEPLOY) {
    solver = await ElevatorSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await ElevatorSolver.attach(SOLVER_ADDRESS);
  }

  await solver.solveChallenge(challenge.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
