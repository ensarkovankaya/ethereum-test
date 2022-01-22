import express from 'express';
import {getAddressBalance} from "./ethereum";
import {getEthereumExchange} from "./exhange-rate";


interface Response {
    address: string;
    valid: boolean;
    balance?: {
        wei: string,
        usd: string
    }
}

const app = express();
app.use(express.json())

app.post('/', async (req, res) => {
    const body = req.body as Array<string>
    const exchangeRateResult = await getEthereumExchange()
    let response: Response[] = await Promise.all(body.map(address => getAddressBalance(address, exchangeRateResult.value)))
    return res.status(200).json(response)
})


app.listen(3000, () => {
    console.log("Application started")
})
