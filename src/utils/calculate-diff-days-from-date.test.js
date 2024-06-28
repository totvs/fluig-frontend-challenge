import { calculateDiffDaysFromDate } from "./calculate-diff-days-from-date.js";

describe("calculateDiffDaysFromDate", () => {
  it("should calculate parking days at column", () => {
    const deadline = new Date();
    const days = calculateDiffDaysFromDate(deadline);
    expect(days).toBe(0);
  });

  it("should calculate parking days at column for a specific date in past", () => {
    const deadline = "2022-01-01T00:00:00.000Z";
    const days = calculateDiffDaysFromDate(deadline);
    expect(days).toBe(-909);
  });

  it("should calculate parking days at column for a specific date in future", () => {
    const deadline = "2025-01-01T00:00:00.000Z";
    const days = calculateDiffDaysFromDate(deadline);
    expect(days).toBe(187);
  });
});
