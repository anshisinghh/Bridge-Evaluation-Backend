import { ethers, Provider, Wallet } from "ethers";

export class BlockchainWriter {
  private nonce: number;
  private wallet: Wallet;
  private provider: Provider;

  constructor(walletPrivateKey: string, providerUrl: string) {
    this.provider = ethers.getDefaultProvider(providerUrl);
    this.wallet = new Wallet(walletPrivateKey, this.provider);
    this.nonce = 0;
    this.setNonce();
  }

  private async setNonce(): Promise<void> {
    this.nonce = await this.wallet.getNonce();
  }

  public async submitTransaction(transaction: ethers.ContractTransaction): Promise<ethers.TransactionReceipt | null> {
    const response = await this.wallet.sendTransaction({
      ...transaction,
      nonce: this.nonce++,
    });

    return await this.provider.getTransactionReceipt(response.hash);
  }
}