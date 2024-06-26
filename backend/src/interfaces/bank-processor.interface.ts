export interface BankTransferProcessor {
    processBankTransfer(amount: number, bankAccount: string): void;
}