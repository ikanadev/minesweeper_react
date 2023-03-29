export function milliToSecs(milli: number, decimals: number = 0): string {
	return (milli / 1000).toFixed(decimals);
}
