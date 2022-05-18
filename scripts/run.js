const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({ value: hre.ethers.utils.parseEther("20") });
    await waveContract.deployed();
    console.log("Contract addy:", waveContract.address)

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance))

    let waveTxn = await waveContract.wave("A message #1!");
    await waveTxn.wait();

    let waveTxn2 = await waveContract.wave("A message #2!");
    await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance))

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves)
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();