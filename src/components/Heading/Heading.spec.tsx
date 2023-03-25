import { fireEvent, render, screen } from "@testing-library/react";
import { Theme } from "~/hooks";

import Heading from "./Heading";

describe("<Heading />", () => {
	it("should render", () => {
		render(<Heading />);
		const headingEl = screen.getByRole("heading", { level: 1 });
		const themeBtnEl = screen.getByRole("button");
		expect(headingEl).toBeInTheDocument();
		expect(themeBtnEl).toBeInTheDocument();
	});
	it("should toggle theme", () => {
		render(<Heading />);
		const themeBtnEl = screen.getByRole("button");
		expect(document.documentElement).not.toHaveClass(Theme.Dark);
		fireEvent.click(themeBtnEl);
		expect(document.documentElement).toHaveClass(Theme.Dark);
		fireEvent.click(themeBtnEl);
		expect(document.documentElement).not.toHaveClass(Theme.Dark);
	});
});
