// Convert English to Bangla Digits
export const toBn = (number: number | string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  return number
    .toString()
    .split('')
    .map(digit => (/\d/.test(digit) ? bengaliDigits[parseInt(digit)] : digit))
    .join('');
};
