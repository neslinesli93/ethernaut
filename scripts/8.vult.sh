curl https://rinkeby.infura.io/v3/$PROJECT_ID \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_getStorageAt","params": ["0x4fe7d53460271df9EAFA299b1F1a6944960813f9", "0x0000000000000000000000000000000000000000000000000000000000000001", "latest"],"id":1}'