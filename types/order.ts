export interface Order {
  id: string;
  userId: string;
  items: { id: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}
