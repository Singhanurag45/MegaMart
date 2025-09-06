// frontend/src/pages/MyOrdersPage.jsx

import React, { useState, useEffect } from "react";
import api from "../api/axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get("/orders/myorders");
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "shipped":
        return "info";
      case "delivered":
        return "success";
      case "canceled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
