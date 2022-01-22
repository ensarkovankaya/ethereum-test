import axios from "axios";

export const getEthereumExchange = async () => {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD")
        return {successful: true, value: response.data.ethereum.usd}
    } catch (e) {
        console.error("Get ethereum exchange value failed", e)
        return {successful: false}
    }
}

