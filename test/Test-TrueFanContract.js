const chai = require("chai");
chai.use(require("chai-as-promised"));
const { expect } = chai;

const TrueFanContract = artifacts.require("TrueFanContract");

contract("TrueFanContract", (accounts) => {
  const names = ["Alice", "Bob", "Charlie"];
  const URLs = [
    "https://static.wikia.nocookie.net/fairlyoddfanon/images/e/ed/Cosmo_image.png/revision/latest/top-crop/width/300/height/300?cb=20200709205901",
    "https://static.wikia.nocookie.net/heroes-and-villain/images/7/7e/Wanda_flash_animation.png/revision/latest?cb=20200224191507",
    "https://vignette.wikia.nocookie.net/dpwikia/images/3/3c/Render-_Danny_Phantom_stock_image.png/revision/latest?cb=20200412001659",
  ];

  xit("should add new Creator", async () => {
    const TrueFanContractInstance = await TrueFanContract.deployed();
    await TrueFanContractInstance.registerCreator(names[0], URLs[0], {
      from: accounts[0],
    });

    expect(
      (await TrueFanContractInstance.usernameToCreator(names[0]))
        .displayPictureURL
    ).to.equal(URLs[0]);
  });

  xit("should fail if Creator exists", async () => {
    const TrueFanContractInstance = await TrueFanContract.deployed();
    await TrueFanContractInstance.registerCreator(names[1], URLs[0], {
      from: accounts[1],
    });

    expect(TrueFanContractInstance.registerCreator(names[1], URLs[1])).to.be
      .rejected;
  });

  xit("should fail if no such Creator exists", async () => {
    const TrueFanContractInstance = await TrueFanContract.deployed();

    expect(
      TrueFanContractInstance.purchaseSubscription(names[0], {
        from: accounts[1],
      })
    ).to.be.rejected;
  });

  it("should add a new subscription", async () => {
    const TrueFanContractInstance = await TrueFanContract.deployed();
    await TrueFanContractInstance.registerCreator(names[0], URLs[0], {
      from: accounts[0],
    });

    await TrueFanContractInstance.purchaseSubscription(names[0], {
      from: accounts[1],
    });

    expect(
      (await TrueFanContractInstance.addressToSubscriptions(accounts[1], 0))
        .creatorUsername
    ).to.equal(names[0]);
  });
});
