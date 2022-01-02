const { ethers } = require('hardhat');

const CHALLENGE_ADDRESS = '0xd2aDEB10Ce31b2529862aB529bB99034A8dbd8FE';

const DEPLOY = false;
const SOLVER_ADDRESS = '0x434e2CB26FD80B30c0328a31BC8977C7120519b9';

async function main() {
  const CoinFlip = await ethers.getContractFactory('CoinFlip');
  const challenge = await CoinFlip.attach(CHALLENGE_ADDRESS);

  const CoinFlipSolver = await ethers.getContractFactory('CoinFlipSolver');

  let solver;
  if (DEPLOY) {
    solver = await CoinFlipSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await CoinFlipSolver.attach(SOLVER_ADDRESS);
  }

  for (let i = 0; i < 100; i++) {
    await solver.guessFlip(challenge.address);

    let wins = await challenge.consecutiveWins();
    if (wins >= 10) {
      console.log('Won 10 times, exiting...');
      break;
    }

    await sleep(30000);
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
