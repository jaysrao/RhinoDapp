const { ethers }      = require('ethers');
const starkwareCrypto = require('@starkware-industries/starkware-crypto-utils');
const BigNumber       = require('bignumber.js');


const EC_ORDER        = new BigNumber("3618502788666131213697322783095070105526743751716087489154079457884512865583");

export default function generate(ethKey, privateKey) {
    const keyPair         = starkwareCrypto.ec.keyFromPrivate(privateKey, 'hex');
    const publicKey       = starkwareCrypto.ec.keyFromPublic(
                              keyPair.getPublic(true, 'hex'),
                              'hex'
                            );

    const publicKeyX      = publicKey.pub.getX().toString();
    const pubYStr         = publicKey.pub.getY().toString();


    const msgHash_        = new BigNumber(ethers.utils.solidityKeccak256(["string","address", "uint256"], ["UserRegistration:", ethKey, publicKeyX]));
    const msgHash_modulo  = msgHash_.mod(EC_ORDER).toString(16);

    const {r, s}          = starkwareCrypto.sign(keyPair, msgHash_modulo);
    const signature_      = ethers.utils.solidityPack(
        ["uint256","uint256", "uint256"],
        [r.toString(),s.toString(),pubYStr]);

    console.log("ethKey: "   , ethKey);
    console.log("Stark Key: ", publicKeyX);
    console.log("Signature: ", signature_);

    return signature_;
}

