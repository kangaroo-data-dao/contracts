const { BigNumber } = require("ethers")
const { DEPLOYED_CONTRACT } = require("../constants")
task("create-proposal", "Sends 1 FIL to a whomever the client on the bountied deal is.").setAction(
    async (taskArgs) => {
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
        transaction = await kangaroo.createSubmission(
            1,
            "NEW",
            "0xa2Edd6e43137Ad01789B5BEe5Df7600370122dE2",
            BigNumber.from(1)
        )
        await transaction.wait()
        console.log("Complete!")
    }
)
