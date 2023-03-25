/// <reference types="vite/client" />
import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare global {
	namespace Vi {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		interface Assertion extends TestingLibraryMatchers<any, void> {}
		interface AsymmetricMatchersContaining
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			extends TestingLibraryMatchers<any, void> {}
	}
}
