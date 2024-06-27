import { getFormattedTaskDueDate } from "./ge-formatted-task-due-date.js";

describe("GetFormattedTaskDueDate", () => {
  it("should remove seconds from due date", () => {
    const dueDate = "2022-01-01T00:00:00.000Z";
    const formattedDate = getFormattedTaskDueDate(dueDate);
    expect(formattedDate).toBe("2022-01-01T00:00");
  });

  it("should remove seconds from due date", () => {
    const dueDate = "2022-01-01T18:10:05.000Z";
    const formattedDate = getFormattedTaskDueDate(dueDate);
    expect(formattedDate).toBe("2022-01-01T18:10");
  });
});
