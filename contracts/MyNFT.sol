// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

//below imports are common for every NFT project
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage , Ownable{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;//since every nft has to have some id

    constructor() ERC721("Laddoo","LDO"){}

    function mintNFT(address recipient, string memory tokenURI)public onlyOwner returns(uint256){ //tokenURI is the image address from IPFS, onlyOwner is from ownable package
        
        _tokenIds.increment();//comes from Counters package,here we increment the tokenId

        uint256 newItemId = _tokenIds.current();

        _mint(recipient, newItemId);//comes from ERC721 package, here we mint the token to the given address

        _setTokenURI(newItemId, tokenURI); //comes from ERC721URIStorage package,here we link the generated token to a unique id
        
        return newItemId;   

    }


}