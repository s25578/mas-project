export interface BankTransferProcessorInterface {
    processBankTransfer(amount: number, bankAccount: string): void;
}