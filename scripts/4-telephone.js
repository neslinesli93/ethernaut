const { ethers } = require('hardhat');

const CHALLENGE_ADDRESS = '0x448B32cfd4D932c8610cc7822E31150F71ABD82F';

const DEPLOY = false;
const SOLVER_ADDRESS = '0x0aF7976b8e6669cC9264b2f000adBb7eacBef165';

async function main() {
  const Telephone = await ethers.getContractFactory('Telephone');
  const challenge = await Telephone.attach(CHALLENGE_ADDRESS);

  const TelephoneSolver = await ethers.getContractFactory('TelephoneSolver');

  let solver;
  if (DEPLOY) {
    solver = await TelephoneSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await TelephoneSolver.attach(SOLVER_ADDRESS);
  }

  await solver.changeOwner(challenge.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
