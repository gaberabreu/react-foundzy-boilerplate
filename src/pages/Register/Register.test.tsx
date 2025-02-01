import { toast } from "react-toastify";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useNavigate } from "@tanstack/react-router";

import { postRegister } from "@/services/auth.service";

import Register from "./Register";

describe("Register", () => {
  let mockNavigate: Mock;

  beforeEach(() => {
    mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should render Register properly", () => {
    const { getByText } = render(<Register />);

    expect(getByText("Register")).toBeInTheDocument();
  });

  it("should navigate to / when form submission succeeds", async () => {
    vi.mocked(postRegister).mockResolvedValue({
      token: "fakeToken",
      email: "fakeEmail@example.com",
      userId: "fakeUserId",
    });

    const { getByText, getByLabelText } = render(<Register />);

    fireEvent.change(getByLabelText("Email"), {
      target: { value: "mail@example.com" },
    });

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(postRegister).toHaveBeenCalledWith({
        email: "mail@example.com",
        password: "password123",
      });
    });

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
  });

  it("should toast error when form submission fails", async () => {
    vi.mocked(postRegister).mockRejectedValue({ title: "Register failed" });

    const { getByText, getByLabelText } = render(<Register />);

    fireEvent.change(getByLabelText("Email"), {
      target: { value: "mail@example.com" },
    });

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(postRegister).toHaveBeenCalledWith({
        email: "mail@example.com",
        password: "password123",
      });
    });

    expect(toast.error).toHaveBeenCalledWith("Register failed");
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
