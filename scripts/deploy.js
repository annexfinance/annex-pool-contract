// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const ANNVault = await hre.ethers.getContractFactory("ANNVault");
  const aNNVault = await ANNVault.deploy(
    '0xb8d4debc77fe2d412f9ba5b22b33a8f6c4d9ae1e',
    '0xDd1651eb0De5648e73Bd7EE8af8cFEF7681Dc915',
    '0x2E241fF5bee46DBf7E3b984D15388989b912F2A6',
    '0x0000000000000000000000000000000000000000'
  );

  await aNNVault.deployed();

  console.log("ANNVault deployed to:", aNNVault.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
