const { BigNumber } = require("ethers")
task("deploy-dao", "Sends 1 FIL to a whomever the client on the bountied deal is.").setAction(
    async (taskArgs) => {
        const FACTORY_CONTRACT = "0x47F8442Ec0f7c356D4d041f9Fcbb96601DD53Bb4"
        console.log("Creating a new proposal", FACTORY_CONTRACT)
        //store taskargs as useable variables
        const contractAddr = FACTORY_CONTRACT
        const networkId = network.name
        console.log("Creating a proposal", networkId)

        //create a new wallet instance
        const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)
        console.log(wallet)

        //create a DealRewarder contract factory
        const KangarooContract = await ethers.getContractFactory("KangarooFactory", wallet)
        //create a DealRewarder contract instance
        //this is what you will call to interact with the deployed contract
        const kangarooFactory = await KangarooContract.attach(contractAddr)

        //send a transaction to call claim_bounty() method
        transaction = await kangarooFactory.createKangaroo(
            "1",
            "RAJ",
            ["0xa2Edd6e43137Ad01789B5BEe5Df7600370122dE2"],
            [BigNumber.from(10000000)],
            BigNumber.from(1000000000)
        )
        await transaction.wait()
        address = await kangarooFactory.getKangaroo("1")
        console.log("Complete!", address)
    }
)
