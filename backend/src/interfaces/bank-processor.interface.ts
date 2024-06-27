export interface BankTransferProcessorInterface {

    durationLimit: number;
    isConfirmationRequired: boolean;

    processBankTransfer(amount: number, bankAccount: string): void;
}