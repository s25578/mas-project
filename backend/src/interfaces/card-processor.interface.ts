export interface CardProcessor {
    processCardPayment(amount: number): void;
}