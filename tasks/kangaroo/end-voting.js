const { DEPLOYED_CONTRACT } = require("../constants")
task("end-voting", "End the voting for a particular proposal").setAction(async (taskArgs) => {
    console.log("Creating a new proposal", DEPLOYED_CONTRACT)
    //store taskargs as useable variables
    const contractAddr = DEPLOYED_CONTRACT
    const networkId = network.name
    console.log("Creating a proposal", networkId)

    //create a new wallet instance
    const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)
    console.log(wallet)

    //create a DealRewarder contract factory
    const KangarooContract = await ethers.getContractFactory("Kangaroo", wallet)
    //create a DealRewarder contract instance
    //this is what you will call to interact with the deployed contract
    const kangaroo = await KangarooContract.attach(contractAddr)

    //send a transaction to call claim_bounty() method
    transaction = await kangaroo.endVoting(1)
    transaction.wait()
    console.log("Complete!")
})
