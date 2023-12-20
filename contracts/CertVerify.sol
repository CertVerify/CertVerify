// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721URIStorage {
    struct Institute {
        bool isRegistered;
        uint256 mintedCount;
    }

    address owner;
    address public voidAddress = address(0); // The void address

    mapping(address => Institute) public institutes;
    mapping(uint256 => string) public tokenIdToUserName;
    mapping(uint256 => uint256) public tokenChecker;

    event InstituteAdded(address indexed institute);
    event CertificateMinted(uint256 indexed tokenId, address indexed institute, string userName);
    event CertificateBurnt(uint256 indexed tokenId, address indexed institute);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    modifier onlyRegisteredInstitute() {
        require(institutes[msg.sender].isRegistered, "Institute not registered");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function addInstitute(address _institute) external onlyOwner {
        require(!institutes[_institute].isRegistered, "Institute already registered");
        institutes[_institute] = Institute(true, 0);
        emit InstituteAdded(_institute);
    }

    function mintCertificate(uint256 _tokenId, string memory _userName, string memory _tokenURI) external onlyRegisteredInstitute returns (uint) {
        require((tokenChecker[_tokenId] != 1), "Token already minted");
        require(bytes(_userName).length > 0, "User name cannot be empty");
        require(institutes[msg.sender].mintedCount <= 100, "Max certificates minted by institute reached");

        tokenChecker[_tokenId] = 1;
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        tokenIdToUserName[_tokenId] = _userName;
        institutes[msg.sender].mintedCount++;

        emit CertificateMinted(_tokenId, msg.sender, _userName);

        return _tokenId;
    }

    function burnCertificate(uint256 _tokenId) external onlyRegisteredInstitute {
        require(tokenChecker[_tokenId] == 1 , "Token does not exist");
        require(ownerOf(_tokenId) == msg.sender, "Not the owner of the certificate");

        _burn(_tokenId);
        delete tokenIdToUserName[_tokenId];
        tokenChecker[_tokenId] = 0;

        emit CertificateBurnt(_tokenId, msg.sender);
    }

    function associateUser(uint256 _tokenId, string memory _userName) external {
        require(ownerOf(_tokenId) == msg.sender, "Not the owner of the certificate");
        require(bytes(_userName).length > 0, "User name cannot be empty");

        tokenIdToUserName[_tokenId] = _userName;
    }
}
