import { useState, useEffect, useCallback } from "react";

export const THEME_KEY = "THEME";

export enum Theme {
	Light = "light",
	Dark = "dark",
}

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>(getDefaultTheme());

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === Theme.Dark ? Theme.Light : Theme.Dark));
	}, []);

	useEffect(() => {
		const bodyEl = document.documentElement;
		if (!bodyEl) return;
		if (theme === Theme.Dark) {
			bodyEl.classList.add(theme);
			localStorage.setItem(THEME_KEY, theme);
		}
		if (theme === Theme.Light) {
			bodyEl.classList.remove(Theme.Dark);
			localStorage.removeItem(THEME_KEY);
		}
	}, [theme]);

	return { theme, toggleTheme };
};

function getDefaultTheme(): Theme {
	const themeStr = localStorage.getItem(THEME_KEY);
	if (themeStr === Theme.Dark) {
		return Theme.Dark;
	}
	return Theme.Light;
}
