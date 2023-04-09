require ("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// console.log(JSON.stringify(contract.abi));

const contractAddress = "0xF9A5378e5f3e702448e820EFb29A0FEdE1D7e69E";
const nftContract = new web3.eth.Contract(contract.abi,contractAddress);

//create transaction
async function mintNFT(tokenURI){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY,"latest");

    const tx = {
        'from' : PUBLIC_KEY,
        'to' : contractAddress,
        'nonce' : nonce,
        'gas' : 50000,
        'data' : nftContract.methods.mintNFT(PUBLIC_KEY,tokenURI).encodeABI(),
        };

        const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        signPromise
        .then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
            if (!err) {
                console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
                );
            } else {
                console.log(
                "Something went wrong when submitting your transaction:",
                err
                );
            }
            }
        );
        })
        .catch((err) => {
        console.log(" Promise failed:", err);
        });

        

}

mintNFT("https://gateway.pinata.cloud/ipfs/QmaWJEL68vpYRpbEejwEfTor5n53ZbePFMFVWsBCT94MRu?_gl=1*zxetlw*rs_ga*YTE5ZGMwYWUtNmE1Ni00NDM5LWJhZjItZDhlY2M5YjU5MjA5*rs_ga_5RMPXG14TE*MTY4MDgzNTg5OS4xLjEuMTY4MDgzNjU5My42MC4wLjA.");