import { Component, HostListener, NgZone } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const simpliWaterAtifacts = require('../../build/contracts/SimpliWaterToken.json');
import { canBeNumber } from '../util/validation';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  SimpliWaterContract = contract(simpliWaterAtifacts);

  accounts: any;
  admin_account: any;
  meter_account: any;
  user_1_account: any;
  user_2_account: any;
  web3: any;

  balance: number;
  sendingAmount: number;
  meterAddress: string;
  status: string;
  canBeNumber = canBeNumber;

  constructor(private _ngZone: NgZone) {

  }

  @HostListener('window:load')
  windowLoaded() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:7545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545')
      );
    }
  };

  onReady = () => {
    // Bootstrap the MetaCoin abstraction for Use.
    this.SimpliWaterContract.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
      this.accounts = accs;
      this.admin_account = this.accounts[0]; //0xF719866EC4a89465b1255d11fD4Ea73C07846759
      this.meter_account = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
      this.user_1_account = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
      console.log("accounts: ", this.accounts);
      console.log("admin: ", this.admin_account);
      console.log("meter: ", this.meter_account);
      console.log("user: ", this.user_1_account);

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() =>
      console.log("inside")//this.registerMeter()
//        this.refreshBalance()
      );
    });
  };

  getBalance = () => {
    let meta;
    this.SimpliWaterContract
      .deployed()
      .then(instance => {
        meta = instance;
        console.log(this.admin_account);
        console.log(meta);
        return meta.balanceOf(this.meter_account, {from:this.admin_account});
      })
      .then(value => {
        this.balance = value;
        console.log(parseInt(value));
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error getting balance; see log.');
      });
  };


 registerMeter = () => {
    let meta;
    this.SimpliWaterContract
      .deployed()
      .then(instance => {
        meta = instance;
        return meta.registerMeter(this.meter_account, {from:this.admin_account});
      })
      .then(value => {
        this.balance = value;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error getting balance; see log.');
      });
  };




  setStatus = message => {
    this.status = message;
  };


  // sendCoin = () => {
  //   let meta;

  //   this.setStatus('Initiating transaction... (please wait)');

  //   this.SimpliWaterContract
  //     .deployed()
  //     .then(instance => {
  //       meta = instance;
  //       return meta.sendCoin(receiver, amount, {
  //         from: this.account
  //       });
  //     })
  //     .then(() => {
  //       this.setStatus('Transaction complete!');
  //       // this.refreshBalance();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error sending coin; see log.');
  //     });
  // };



  // sendCoin = () => {
  //   const amount = this.sendingAmount;
  //   const receiver = this.meterAddress;
  //   let meta;

  //   this.setStatus('Initiating transaction... (please wait)');

  //   this.SimpliWaterContract
  //     .deployed()
  //     .then(instance => {
  //       meta = instance;
  //       return meta.sendCoin(receiver, amount, {
  //         from: this.account
  //       });
  //     })
  //     .then(() => {
  //       this.setStatus('Transaction complete!');
  //       this.refreshBalance();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error sending coin; see log.');
  //     });
  // };




  // sendCoin = () => {
  //   const amount = this.sendingAmount;
  //   const receiver = this.meterAddress;
  //   let meta;

  //   this.setStatus('Initiating transaction... (please wait)');

  //   this.SimpliWaterContract
  //     .deployed()
  //     .then(instance => {
  //       meta = instance;
  //       return meta.sendCoin(receiver, amount, {
  //         from: this.account
  //       });
  //     })
  //     .then(() => {
  //       this.setStatus('Transaction complete!');
  //       this.refreshBalance();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error sending coin; see log.');
  //     });
  // };
}
