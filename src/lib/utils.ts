// // utils.ts - utility functions used across the app

// export function formatCurrency(amount: number): string {
//   return `$${amount.toFixed(2)}`;
// }

// // Add other utility functions here as needed
// src/lib/utils.ts

// simple classnames function that joins arguments (strings or falsy values)
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// other utils...
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
export const getMonthOptions = (numMonths: number = 12) => {
  const options = [{ value: 'All', label: 'All Months' }];
  const today = new Date();

  for (let i = 0; i < numMonths; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1); // Start of the month
    const year = date.getFullYear();
    const monthShort = date.toLocaleString('en-US', { month: 'short' });
    const monthNumber = (date.getMonth() + 1).toString().padStart(2, '0'); // 01, 02, etc.

    options.push({ value: `${year}-${monthNumber}`, label: `${monthShort} ${year}` });
  }
  return options;
};