require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", wallet.address)
    const chainId = network.config.chainId
    const tokensToBeMinted = networkConfig[chainId]["tokensToBeMinted"]

    const KangarooFactory = await ethers.getContractFactory("KangarooFactory", wallet)
    console.log("Deploying KangarooFactory...")
    const kangarooFactory = await KangarooFactory.deploy()
    await kangarooFactory.deployed()
    console.log("Kangaroo Factory deployed to:", kangarooFactory.address)

    // const KDCoin = await ethers.getContractFactory("KDCoin", wallet)
    // console.log("Deploying KDCoin...")
    // const kdCoin = await KDCoin.deploy("KDC")
    // await kdCoin.deployed()
    // console.log("KDCoin deployed to:", kdCoin.address)
    //
    // const KangarooContract = await ethers.getContractFactory("Kangaroo", wallet)
    // console.log("Deploying Kangaroo Contract...")
    // const kangaroo = await KangarooContract.deploy(kdCoinContract, [
    //     "0xa2Edd6e43137Ad01789B5BEe5Df7600370122dE2",
    // ])
    // await kangaroo.deployed()
    // console.log("Kangaroo Contract deployed to:", kangaroo.address)

    //deploy FilecoinMarketConsumer

    // const FilecoinMarketConsumer = await ethers.getContractFactory("FilecoinMarketConsumer", wallet)
    // console.log("Deploying FilecoinMarketConsumer...")
    // const filecoinMarketConsumer = await FilecoinMarketConsumer.deploy()
    // await filecoinMarketConsumer.deployed()
    // console.log("FilecoinMarketConsumer deployed to:", filecoinMarketConsumer.address)

    //deploy DealRewarder

    // const DealRewarder = await ethers.getContractFactory("DealRewarder", wallet)
    // console.log("Deploying DealRewarder...")
    // const dealRewarder = await DealRewarder.deploy()
    // await dealRewarder.deployed()
    // console.log("DealRewarder deployed to:", dealRewarder.address)
}
