export interface CardData {
  title: string;
  description: string;
  status: string;
  type: "fix" | "feature" | "investigation" | "refactor";
  assignedUserId: number;
  priority: "high" | "medium" | "low";
  dueDate: string;
}
