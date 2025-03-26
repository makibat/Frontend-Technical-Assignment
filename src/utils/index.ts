export const centsToEuros = (amount: number) => Number((amount / 100).toFixed(2));

export const eurosToCents = (amount: number) => amount * 100;

export const toDecimalNumber = (amount: number) => Number(Math.round(amount * 100) / 100).toFixed(2);

export const toWholeNumber = (amount: number) => Number(amount.toFixed(0));
