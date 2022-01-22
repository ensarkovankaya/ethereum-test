import {BigNumber} from "bignumber.js";
import Web3 from 'web3'

const web3 = new Web3("wss://mainnet.infura.io/ws/v3/33c1652281ab46b7a08d4a40ba00c2dd")

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
export const isAddressValid = (address: string) => {
    return (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address))
};

export const getAddressBalance = async (address: string, exchangeRate: number) => {
    if (!isAddressValid(address.toLowerCase())) {
        return {
            address,
            valid: false,
        }
    }
    const wei = await web3.eth.getBalance(address)
    const usd = new BigNumber(web3.utils.fromWei(wei)).times(exchangeRate)
    return {
        address,
        valid: true,
        balance: {
            wei,
            usd: usd.toNumber().toFixed(2).toString()
        }
    }
}
