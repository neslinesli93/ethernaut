const { ethers } = require('hardhat');

const CHALLENGE_ADDRESS = '0xA1817C079C4eB1146857e7678fC7f4722ca574b7';

const DEPLOY = false;
const SOLVER_ADDRESS = '0x9864210639C458DA85294A481EB45a32403D5208';

async function main() {
  const King = await ethers.getContractFactory('King');
  const challenge = await King.attach(CHALLENGE_ADDRESS);

  const prize = await challenge.prize();
  console.log(`Prize is ${ethers.utils.formatEther(prize)} eth`);

  const KingSolver = await ethers.getContractFactory('KingSolver');

  let solver;
  if (DEPLOY) {
    solver = await KingSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await KingSolver.attach(SOLVER_ADDRESS);
  }

  await solver.solveChallenge(challenge.address, 1, { value: 1 });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
