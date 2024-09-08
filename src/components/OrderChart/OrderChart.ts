export interface Order {
  OrderID: number;
  Freight: number;
  OrderDate: string;
  ShippedDate: string;
}

export interface MonthlyData {
  month: string;
  averageNumberOfDays: number | undefined;
}

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
