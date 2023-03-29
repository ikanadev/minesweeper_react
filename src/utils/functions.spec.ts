import { milliToSecs } from "./functions";

describe("milliToSecs()", () => {
	describe("no decimal", () => {
		it.each([
			{ milli: 1000, expected: "1" },
			{ milli: 2499, expected: "2" },
			{ milli: 3500, expected: "4" },
			{ milli: 4499, expected: "4" },
			{ milli: 1001, expected: "1" },
			{ milli: 2999, expected: "3" },
		])("(milli: $milli, decimals: 0)", ({ milli, expected }) => {
			expect(milliToSecs(milli)).toBe(expected);
		});
	});

	describe("with decimals", () => {
		it.each([
			{ milli: 1000, decimals: 1, expected: "1.0" },
			{ milli: 1100, decimals: 1, expected: "1.1" },
			{ milli: 1100, decimals: 2, expected: "1.10" },
			{ milli: 1100, decimals: 3, expected: "1.100" },
			{ milli: 4321, decimals: 1, expected: "4.3" },
			{ milli: 4321, decimals: 2, expected: "4.32" },
			{ milli: 4321, decimals: 3, expected: "4.321" },
			{ milli: 2999, decimals: 1, expected: "3.0" },
			{ milli: 2999, decimals: 2, expected: "3.00" },
			{ milli: 2999, decimals: 3, expected: "2.999" },
			{ milli: 1920, decimals: 1, expected: "1.9" },
			{ milli: 1920, decimals: 2, expected: "1.92" },
			{ milli: 1920, decimals: 3, expected: "1.920" },
		])(
			"(milli: $milli, decimals: $decimals)",
			({ milli, decimals, expected }) => {
				// @ts-ignore
				expect(milliToSecs(milli, decimals)).toBe(expected);
			},
		);
	});
});
