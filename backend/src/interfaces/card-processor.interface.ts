export interface CardProcessorInterface {

    cardTypes: string[];
    processingTypes: string[];

    processCardPayment(amount: number): void;
    preAuth(pan: string, expiry: string, cvv: number): void;
}