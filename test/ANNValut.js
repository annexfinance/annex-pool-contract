const { expect } = require("chai");
var chai = require("chai");
const { ethers } = require("hardhat");
const BN = require("bn.js");
const { Signer } = require("@ethersproject/abstract-signer");
const { messagePrefix } = require("@ethersproject/hash");
const { from } = require("memorystream");
const { BigNumber } = require("ethers");


chai.use(require("chai-bn")(BN));
describe("ANN Vault testing", function () {
  before(async function () {
    ([owner, addr1, addr2, addr3, addr4] = await ethers.getSigners()),
      (AnnToken = await ethers.getContractFactory("ANN")),
      (annToken = await AnnToken.deploy(owner.address)),
      await annToken.deployed();

    (AnnexFarm = await ethers.getContractFactory("AnnexFarm")),
      (annexFarm = await AnnexFarm.deploy(
        annToken.address,
        addr1.address,
        500,
        1000,
        5000
      )),
      await annexFarm.deployed();
    (ANNVault = await ethers.getContractFactory("ANNVault", addr3.address)),
      (aNNVault = await ANNVault.deploy(
        annToken.address,
        annexFarm.address,
        owner.address,
        addr1.address
      )),
      await aNNVault.deployed();
  });

  it("Creating pool in Annex Farms", async function () {
    await annexFarm.connect(owner).add(4000,annToken.address,false);
  });

  it("AnnVault pool set to 0", async function () {
    await aNNVault.connect(owner).setAutoVaultPoolId(0);
  });

  it("getPoolInfo 0", async function () {
    expect(await annexFarm.getPoolInfo(0));
  });

  it("Annex farm is deployed", async function () {
    const tokenaddress = await annexFarm.annex;
    expect(await annexFarm.annex()).to.equal(annToken.address);
  });
  it("Ann valuet is deployed", async function () {
    // const signers = await ethers.getSigners();
    // const tokenaddress=await annexFarm.annex;
    expect(await aNNVault.treasury()).to.equal(addr1.address);
  });

  it("Annex token is deployed", async function () {
    expect(await annToken.symbol()).to.equal("ANN");
  });
  it("deposit amount", async function () {
    // console.log(owner);
    // await annToken.connect(owner).transfer(aNNVault.address, 1000000000000000000);
    await annToken.connect(owner).approve(aNNVault.address, BigNumber.from('1000000000000000000'));
    //await  annToken.approve(owner.address,new BigNumber.from(10000000));
    // const amount = await annToken.balanceOf(aNNVault.address);

    //console.log(addr5.address);
    // console.log(aNNVault.address);
    // console.log(addr3.address);
    const allowance = await annToken.allowance(owner.address, aNNVault.address);

    await aNNVault.connect(owner).deposit(BigNumber.from('1000000000000000000'));
  });
  it("withdraw amount", async function () {
    // await aNNVault.connect(owner).withdraw(BigNumber.from('1000000000000000000'));
    expect(await annToken.symbol()).to.equal("ANN");
  });
  it("balance query", async function () {
    const amount = await aNNVault
      .connect(owner)
      .balanceOf({ from: owner.address });
    const amount2 = await aNNVault.available();
    // console.log(amount);
    // console.log(amount2);
    //expect(await annToken.symbol()).to.equal("ANN");
  });
  it("PerFormance Fee is updated", async function () {
    //await stateMachine.connect(user1).sign();

    await aNNVault.connect(owner).setPerformanceFee(400);
    expect(await aNNVault.performanceFee()).to.equal(400);
  });
  it("Call fee is updated successfully", async function () {
    //await stateMachine.connect(user1).sign();
    await aNNVault.connect(owner).setCallFee(50);
    expect(await aNNVault.callFee()).to.equal(50);
  });
  it("withdraw fee set", async function () {
    //await stateMachine.connect(user1).sign();
    await aNNVault.connect(owner).setWithdrawFee(100);
    expect(await aNNVault.withdrawFee()).to.equal(100);
  });
  it("withdraw fee period set", async function () {
    //await stateMachine.connect(user1).sign();
    await aNNVault.connect(owner).setWithdrawFeePeriod(100);
    expect(await aNNVault.withdrawFeePeriod()).to.equal(100);
  });

  it("Treassure is changed successfully", async function () {
    //await stateMachine.connect(user1).sign();
    await aNNVault.setTreasury(addr3.address);
    expect(await aNNVault.treasury()).to.equal(addr3.address);
  });
  // it("Treassure is changed successfully",async function()
  // {
  //   //await stateMachine.connect(user1).sign();
  //   await aNNVault.setTreasury("0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678");
  //    expect(await aNNVault.treasury()).to.equal("0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678");
  // });
  it("emergency wihdraw", async function () {
    await expect(aNNVault.inCaseTokensGetStuck(annToken.address)).to.be
      .reverted;
    // console.log("this token is already connected");
    // await aNNVault.calculateHarvestANNRewards();
  });
  it("Admin is changed successfully", async function () {
    //await stateMachine.connect(user1).sign();
    await aNNVault.setAdmin(addr1.address);
    expect(await aNNVault.admin()).to.equal(addr1.address);
  });
});
