import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Wallet from 'ethereumjs-wallet';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

@Injectable()
export class AppService {
  private web3: Web3;
  private erc20Abi: AbiItem[];
  constructor(private readonly configService: ConfigService) {
    this.web3 = new Web3(this.configService.get<string>('ETH_RPC'));
    this.erc20Abi = JSON.parse(
      <undefined>fs.readFileSync('./src/erc20.abi.json'),
    );
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getBalance(user_addr: string) {
    try {
      const balance = await this.web3.eth.getBalance(user_addr);
      const formattedBalance = this.web3.utils.fromWei(balance, 'ether');
      return {
        current_balance: formattedBalance,
      };
    } catch (e) {
      console.log(e);
    }

    return 'something wrong';
  }

  async getTokenBalance(token_contract_addr: string, user_addr: string) {
    try {
      const contract = new this.web3.eth.Contract(
        this.erc20Abi,
        token_contract_addr,
      );

      const balance = await contract.methods.balanceOf(user_addr).call();

      const formattedBalance = this.web3.utils.fromWei(balance, 'ether');
      return {
        current_token_balance: formattedBalance,
      };
    } catch (e) {
      console.log(e);
    }

    return 'something wrong';
  }

  async sendToken(
    token_contract_addr: string,
    user_addr: string,
    priv_key: string,
    recipient_addr: string,
    amount: number,
  ) {
    try {
      const contract = new this.web3.eth.Contract(
        this.erc20Abi,
        token_contract_addr,
      );

      const conv_amount = this.web3.utils.toHex(amount); //1 DEMO Token

      const data = contract.methods
        .transfer(recipient_addr, conv_amount)
        .encodeABI();

      const txObj = {
        gas: this.web3.utils.toHex(100000),
        to: token_contract_addr,
        value: '0x00',
        data: data,
        from: user_addr,
      };

      const sign_tx = await this.web3.eth.accounts.signTransaction(
        txObj,
        priv_key,
      );

      const result_send = await this.web3.eth.sendSignedTransaction(
        sign_tx.rawTransaction,
      );

      console.log(result_send);

      return result_send;
    } catch (e) {
      console.log(e);
    }

    return 'something wrong';
  }

  async generateAddress() {
    const addressData = Wallet.generate();

    return {
      addr: addressData.getAddressString(),
      priv_key: addressData.getPrivateKeyString(),
    };
  }
}
