import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "../../src/libs/components/ui/Button";
import { ThemeProvider } from "../../src/libs/provider/theme";
describe("Button", () => {
    it("should disable button", () => {
        render(
            <ThemeProvider>
                <Button disabled>Submit</Button>
            </ThemeProvider>
        );
        screen.debug();
    });
});
