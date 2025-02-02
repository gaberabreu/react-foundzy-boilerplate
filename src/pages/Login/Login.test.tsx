import { toast } from "react-toastify";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useNavigate } from "@tanstack/react-router";

import { postLogin } from "@/services/auth.service";

import Login from "./Login";

describe("Login", () => {
  let mockNavigate: Mock;

  beforeEach(() => {
    mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should render Login properly", () => {
    const { getByText } = render(<Login />);

    expect(getByText("Login")).toBeInTheDocument();
  });

  it("should navigate to / when form submission succeeds", async () => {
    vi.mocked(postLogin).mockResolvedValue({
      token: "fakeToken",
      email: "fakeEmail@example.com",
      userId: "fakeUserId",
    });

    const { getByText, getByLabelText } = render(<Login />);

    fireEvent.change(getByLabelText("Email"), {
      target: { value: "mail@example.com" },
    });

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(postLogin).toHaveBeenCalledWith({
        email: "mail@example.com",
        password: "password123",
      });
    });

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
  });

  it("should toast error when form submission fails", async () => {
    vi.mocked(postLogin).mockRejectedValue(new Error("Login failed"));

    const { getByText, getByLabelText } = render(<Login />);

    fireEvent.change(getByLabelText("Email"), {
      target: { value: "mail@example.com" },
    });

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(postLogin).toHaveBeenCalledWith({
        email: "mail@example.com",
        password: "password123",
      });
    });

    expect(toast.error).toHaveBeenCalledWith("Login failed");
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
