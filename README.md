# Simple Ethereum Dapp

It showcases how to access an injected Ethereum provider, in this case the EIP-1102-complicant `window.ethereum`, alongside the legacy `window.web3`.

The GUI displays:

* whether you are connected to Ethereum
* the balances of your accounts, only if you have expressely allowed it, and if you have any
* the balance of any address you paste in the input box

After cloning it, to run this program, you need to:

```sh
$ npm install
$ npm run dev
```
Then open [http://127.0.0.1:8080](http://127.0.0.1:8080) in your preferred browser.