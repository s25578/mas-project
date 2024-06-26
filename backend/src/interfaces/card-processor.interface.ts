export interface CardProcessorInterface {
    processCardPayment(amount: number): void;
}