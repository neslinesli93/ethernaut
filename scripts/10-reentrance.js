const { ethers } = require('hardhat');

const CHALLENGE_ADDRESS = '0x2DDa90120273EDB2C6e0e89cdde7C26F920aCeD6';

const DEPLOY = false;
const SOLVER_ADDRESS = '0x8bfd12cCC3094142e914aa353Bf62291f9d507D7';

async function main() {
  const Reentrance = await ethers.getContractFactory('Reentrance');
  const challenge = await Reentrance.attach(CHALLENGE_ADDRESS);

  const ReentranceSolver = await ethers.getContractFactory('ReentranceSolver');

  let solver;
  if (DEPLOY) {
    solver = await ReentranceSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await ReentranceSolver.attach(SOLVER_ADDRESS);
  }

  await solver.solveChallenge(challenge.address, { value: ethers.utils.parseEther('0.001') });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
