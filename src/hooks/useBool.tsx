import { useState, useCallback } from "react";

export const useBool = (active: boolean = false) => {
	const [isActive, setIsActive] = useState(active);
	const enable = useCallback(() => setIsActive(true), []);
	const disable = useCallback(() => setIsActive(false), []);
	const toggle = useCallback(() => setIsActive((p) => !p), []);
	return { isActive, enable, disable, toggle, setIsActive } as const;
};
