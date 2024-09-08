import React, { useEffect, useState } from "react";
import { fetchOrders, getDayDifference } from "../../odataService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import "./OrderChart.css";
import { MonthlyData, monthNames, Order } from "./OrderChart";

const OrdersChart: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const onRefreshData = () => {
    setLoading(true);
    getOrders();
  };

  // Ensure all months are present in the data, even if number of orders is zero
  const transformData = (): MonthlyData[] => {
    const allMonths = monthNames;

    const monthMap: { [key: string]: number } = {};
    const counter: { [key: string]: number } = {};

    // Initialize all months with 0
    allMonths.forEach((month) => {
      monthMap[month] = 0;
      counter[month] = 0;
    });

    // Populate the monthMap with average difference between order date and shipped date
    orders.forEach((order) => {
      const month = format(parseISO(order.OrderDate), "MMM"); // Get short month name (e.g., 'Jan')
      const orderDate = order.OrderDate.substring(0, 10);
      const shippedDate = order.ShippedDate.substring(0, 10);
      const dayDifference = getDayDifference(orderDate, shippedDate);

      monthMap[month] += dayDifference;
      counter[month] += 1;
    });

    // Convert the month map into an array for the chart
    return allMonths.map((month) => ({
      month,
      averageNumberOfDays:
        counter[month] > 0
          ? +(monthMap[month] / counter[month]).toFixed(2)
          : undefined,
    }));
  };

  return (
    <>
      <p>Average processing time per month</p>
      <button className="refresh-button" onClick={onRefreshData}>
        Refresh
      </button>
      {loading && <div className="loader-container">Loading...</div>}
      {!loading && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={transformData()}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* XAxis for months */}
            <XAxis
              dataKey="month"
              ticks={monthNames}
            />
            <YAxis domain={[0, 25]} ticks={[0, 5, 10, 15, 20, 25]} />
            <Tooltip />
            <Line
              type="linear"
              dataKey="averageNumberOfDays"
              stroke="#8884d8"
              dot={{ fill: "#8884d8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default OrdersChart;
