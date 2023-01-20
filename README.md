## Installation

```bash
$ npm i
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Support

For update rpc web3 (default use eth "Goerli") use [list](https://rpc.info/).
For [eth](https://goerlifaucet.com/).
For [token](https://faucets.chain.link/).


## cURL for send request

```bash
# create address
$ curl --request GET \
  --url http://localhost:3000/generate-address

# get balance eth
$ curl --request GET \
  --url http://localhost:3000/balance-eth/0x854b2b3c1f25d941bf69c72607f6045594e93214

# get token balance eth
$ curl --request GET \
  --url http://localhost:3000/balance/0x326C977E6efc84E512bB9C30f76E30c160eD06FB/0x854b2b3c1f25d941bf69c72607f6045594e93214

# send token
$ curl --request POST \
  --url http://localhost:3000/send-token/ \
  --header 'Authorization: Bearer 0x3ec3648f9e162df29769b11c954a2a5ce52fb19e36525d56c6acacb286c68c0f' \
  --header 'Content-Type: application/json' \
  --data ' {
"token_addr": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
"user_addr": "0x854b2b3c1f25d941bf69c72607f6045594e93214",
"recipient_addr": "0x7a003334ba9a97857e9c9b0c02dae1e7532fbed5",
"amount": 300000000
}
'

```

## Stay in touch

- Author - [Oleksandr Makaruk](https://www.linkedin.com/in/olexandr-makaruk-083959202/)
