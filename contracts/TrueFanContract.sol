pragma solidity >=0.4.22 <0.8.0;

contract TrueFanContract {
    struct Creator {
        string username;
        string displayPictureURL;
        address creatorAddress;
    }

    // Every creator must have a unique username.
    mapping(string => Creator) public usernameToCreator;

    function registerCreator(
        string memory _username,
        string memory _displayPictureURL
    ) public {
      require(usernameToCreator[_username].creatorAddress == address(0x0));
      Creator memory newCreator = Creator(_username, _displayPictureURL, msg.sender);
      usernameToCreator[_username] = newCreator;
    }
}
