import { Validator } from "../utils/validator";

export class Ohlc {
    private open: number;
    private high: number;
    private low: number;
    private close: number;

    constructor(open: number, high: number, low: number, close: number) {

        Validator.isNonNegativeNumber({open});
        Validator.isNonNegativeNumber({high});
        Validator.isNonNegativeNumber({low});
        Validator.isNonNegativeNumber({close});

        this.logicalCheck(open, high, low, close);

        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
    }

    // Custom constraint
    private logicalCheck(open: number, high: number, low: number, close: number): void {
        if (!(low <= open && low <= close && low <= high &&
            high >= open && high >= close && high >= low)) {
            throw new Error(`Logical inconsistency detected in your prices.`);
        }
    }

    public getOpen(): number {
        return this.open;
    }

    public setOpen(value: number): void {
        Validator.isNonNegativeNumber({value});
        this.logicalCheck(value, this.high, this.low, this.close);
        this.open = value;
    }

    public getHigh(): number {
        return this.high;
    }

    public setHigh(value: number): void {
        Validator.isNonNegativeNumber({value});
        this.logicalCheck(this.open, value, this.low, this.close);
        this.high = value;
    }

    public getLow(): number {
        return this.low;
    }

    public setLow(value: number): void {
        Validator.isNonNegativeNumber({value});
        this.logicalCheck(this.open, this.high, value, this.close);
        this.low = value;
    }

    public getClose(): number {
        return this.close;
    }

    public setClose(value: number): void {
        Validator.isNonNegativeNumber({value});
        this.logicalCheck(this.open, this.high, this.low, value);
        this.close = value;
    }

    public getChange(): number {
        return ((this.close - this.open) / this.open) * 100;
    }

    public toString(): string {
        return `Open: ${this.open}, High: ${this.high}, Low: ${this.low}, Close: ${this.close}, Change: ${this.getChange()}%`;
    }
}