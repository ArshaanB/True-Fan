const TrueFanContract = artifacts.require("TrueFanContract");

module.exports = function (deployer) {
  deployer.deploy(TrueFanContract);
};
