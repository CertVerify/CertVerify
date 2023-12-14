// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RestrictedNFT is ERC721, Ownable {
    address[] private instituteAddresses;
    address public owner;
    mapping(address => bool) private isAddressInstitute;

    event NFTTransferred(address indexed from, address indexed to, uint256 tokenId);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
    

    function addInstituteAddress(address _instituteAddress) external onlyOwner {
        require(!isAddressInstitute[_instituteAddress], "Address is already an institute");
        instituteAddresses.push(_instituteAddress);
        isAddressInstitute[_instituteAddress] = true;
    }

    function isAddressInstituteAddress(address _address) external view returns (bool) {
        return isAddressInstitute[_address];
    }



    function transferNFT(address _to, uint256 _tokenId) external {
        require(isAddressInstitute[msg.sender], "Only institute addresses can transfer NFTs");
        require(_to != address(0), "Invalid recipient address");
        // require(exists(_tokenId), "NFT with given ID does not exist");

        address ownerAddress = ownerOf(_tokenId);
        require(ownerAddress == msg.sender, "You are not the owner of this NFT");

        _transfer(ownerAddress, _to, _tokenId);

        emit NFTTransferred(ownerAddress, _to, _tokenId);
    }

    function mintNFT(address _to, uint256 _tokenId) external {
        require(isAddressInstitute[msg.sender], "Only institute addresses can mint NFTs");
        require(_to != address(0), "Invalid recipient address");
       
        require(!exists(_tokenId), "NFT with given ID already exists");

        _mint(_to, _tokenId);

        emit NFTTransferred(address(0), _to, _tokenId);
    }
}
