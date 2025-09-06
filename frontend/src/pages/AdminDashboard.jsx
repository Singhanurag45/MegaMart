// frontend/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get('/orders');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      setOrders(orders.map(o => (o._id === id ? { ...o, status } : o)));
    } catch (error) {
      alert('Failed to update status.');
    }
  };

  return (
    <Box sx={{ p: 3, mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard - All Orders</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>USER</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user?.name || 'N/A'}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="pending">pending</MenuItem>
                    <MenuItem value="shipped">shipped</MenuItem>
                    <MenuItem value="delivered">delivered</MenuItem>
                    <MenuItem value="canceled">canceled</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}