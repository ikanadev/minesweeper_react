import { renderHook, act, screen } from "@testing-library/react";
import { useTheme, Theme, THEME_KEY } from "./useTheme";

describe("useTheme hook", () => {
	afterEach(() => {
		localStorage.removeItem(THEME_KEY);
	});

	it("default theme", () => {
		const { result } = renderHook(() => useTheme());
		expect(result.current.theme).toEqual(Theme.Light);
		const containsDark = document.documentElement.classList.contains(
			Theme.Dark,
		);
		expect(containsDark).toBe(false);
	});

	it("preloaded dark mode", () => {
		localStorage.setItem(THEME_KEY, Theme.Dark);
		const { result } = renderHook(() => useTheme());
		expect(result.current.theme).toEqual(Theme.Dark);
		const containsDark = document.documentElement.classList.contains(
			Theme.Dark,
		);
		expect(containsDark).toBe(true);
	});

	it("toggle theme", () => {
		const { result } = renderHook(() => useTheme());
		expect(result.current.theme).toEqual(Theme.Light);

		act(() => {
			result.current.toggleTheme();
		});
		let storedTheme = localStorage.getItem(THEME_KEY);
		let containsDark = document.documentElement.classList.contains(Theme.Dark);
		expect(result.current.theme).toEqual(Theme.Dark);
		expect(storedTheme).toEqual(Theme.Dark);
		expect(containsDark).toBe(true);

		act(() => {
			result.current.toggleTheme();
		});
		storedTheme = localStorage.getItem(THEME_KEY);
		containsDark = document.documentElement.classList.contains(Theme.Dark);
		expect(result.current.theme).toEqual(Theme.Light);
		expect(storedTheme).toEqual(null);
		expect(containsDark).toBe(false);

		act(() => {
			result.current.toggleTheme();
		});
		storedTheme = localStorage.getItem(THEME_KEY);
		containsDark = document.documentElement.classList.contains(Theme.Dark);
		expect(result.current.theme).toEqual(Theme.Dark);
		expect(storedTheme).toEqual(Theme.Dark);
		expect(containsDark).toBe(true);
	});
});
