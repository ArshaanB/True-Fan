pragma solidity >=0.4.22 <0.8.0;

contract TrueFanContract {
    struct Creator {
        string displayPictureURL;
        uint256 creatorAddress;
    }

    struct Subscription {
        string creatorUsername;
        uint256 lastPayment;
    }

    mapping(string => Creator) public usernameToCreator;
    mapping(address => Subscription[]) public addressToSubscriptions;

    function registerCreator(
        string memory _username,
        string memory _displayPictureURL
    ) public {
        require(
            address(usernameToCreator[_username].creatorAddress) ==
                address(0x0),
            "The username must be unique."
        );
        Creator memory newCreator = Creator(
            _displayPictureURL,
            uint256(msg.sender)
        );
        usernameToCreator[_username] = newCreator;
    }

    function purchaseSubscription(string memory _creatorUsername) public {
        require(
            address(usernameToCreator[_creatorUsername].creatorAddress) !=
                address(0x0),
            "The username must exist."
        );

        Subscription memory foundSubscription;
        Subscription[] memory allSubscriptions = addressToSubscriptions[msg
            .sender];
        for (uint256 i = 0; i < allSubscriptions.length; i++) {
            Subscription memory currSub = allSubscriptions[i];
            if (
                keccak256(abi.encodePacked(currSub.creatorUsername)) ==
                keccak256(abi.encodePacked(_creatorUsername))
            ) {
                foundSubscription = currSub;
                break;
            }
        }

        if (bytes(foundSubscription.creatorUsername).length == 0) {
            foundSubscription = Subscription(_creatorUsername, block.timestamp);
            addressToSubscriptions[msg.sender].push(foundSubscription);
        }
    }
}
