export interface CardData {
  id: number;
  title: string;
  description: string;
  status: string;
  type: "fix" | "feature" | "investigation" | "refactor";
  assigned_user_id: number;
  priority: "1" | "2" | "3";
  due_date: string;
}
