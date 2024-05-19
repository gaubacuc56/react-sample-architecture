import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

test("renders button with label and handles click event", () => {
	const handleClick = jest.fn();
	render(<Button onClick={handleClick}>Click Me</Button>);

	const buttonElement = screen.getByText("Click Me");
	expect(buttonElement).toBeInTheDocument();

	fireEvent.click(buttonElement);
	expect(handleClick).toHaveBeenCalledTimes(1);
});
