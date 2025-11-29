import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Hero from "../Hero";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

vi.mock("../ui/shadcn-io/typing-text", () => ({
  default: () => <div>Hi, I&apos;m Brandon.</div>,
}));

vi.mock("@payloadcms/richtext-lexical/react", () => ({
  RichText: () => <div>Rich text content</div>,
}));

describe("Hero", () => {
  it("renders ErrorMsg when data is null", () => {
    render(<Hero data={null} />);
    expect(
      screen.getByText(/Oops...something went wrong/i)
    ).toBeInTheDocument();
  });
});
