class MoneyPile {
    constructor(private value: number,
                private quantity: number,
                private nextPile?: MoneyPile) {
    }

    public canWithdraw(amount: number): boolean {
        let quantity = this.quantity;

        while (this.canTakeSomeBill(amount)) {
            if (quantity === 0) {
                break;
            }

            amount -= this.value;
            quantity -= 1;
        }

        if (!amount) {
            return true;
        }

        if (this.nextPile) {
            return this.nextPile.canWithdraw(amount);
        }

        return false;

    }

    private canTakeSomeBill(amount: number) {
        return Math.floor(amount / this.value) > 0;
    }

}

class ATM {
    constructor(private hundred: MoneyPile,
                private fifty: MoneyPile,
                private twenty: MoneyPile,
                private ten: MoneyPile) {
    }

    private get startPile(): MoneyPile {
        return this.hundred;
    }

    public canWithdraw(amount: number): string {
        return `Can withdraw: ${this.startPile.canWithdraw(amount)}`;
    }
}

const ten = new MoneyPile(10, 6);
const twenty = new MoneyPile(20, 2, ten);
const fifty = new MoneyPile(50, 2, twenty);
const hundred = new MoneyPile(100, 1, fifty);

const atm = new ATM(hundred, fifty, twenty, ten);

console.log(atm.canWithdraw(310));
console.log(atm.canWithdraw(100));
console.log(atm.canWithdraw(165));
console.log(atm.canWithdraw(30));