import { AxiosError } from "axios";
import FallbackError from "../FallbackError";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<FallbackError/>", () => {
  const mockResetErrorBoundary = vi.fn();

  it("should render default fallback error component", () => {
    const error = new AxiosError("Error message", "500");
    render(
      <FallbackError
        error={error}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );
    expect(
      screen.getByText("Error encountered fetching stock price data")
    ).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  it("should render rate limit fallback error component", () => {
    const error = new AxiosError("Rate limit", "429");
    error.response = {
      status: 429,
      statusText: "Error",
      headers: {},
      config: {} as any,
      data: {},
    };

    render(
      <FallbackError
        error={error}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );
    expect(
      screen.getByText(
        "Rate limit exceeded. Please wait a while before retrying"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  it("should trigger resetErrorBoundary when button is clicked", () => {
    const error = new AxiosError("Rate limit", "429");
    render(
      <FallbackError
        error={error}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );
    const button = screen.getByText("Try again");
    fireEvent.click(button);
    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });
});
