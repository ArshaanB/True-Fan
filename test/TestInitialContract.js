const InitialContract = artifacts.require("InitialContract");

contract('Initial Contract', (accounts) => {
    // beforeAll(async () => {});
    it('should yield the correct meaning of life', async () => {
        const InitialContractInstance = await InitialContract.deployed();
        const meaningOfLife = await InitialContractInstance.meaningOfLife();

        expect(meaningOfLife.toNumber()).to.equal(42);
    });
});