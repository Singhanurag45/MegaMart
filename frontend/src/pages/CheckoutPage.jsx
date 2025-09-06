// frontend/src/pages/CheckoutPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function CheckoutPage({ cart, clearCart }) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();

  // 👇 CORRECTED LINE: This calculation is now safe from errors.
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.quantity || 1) * (item.price || 0),
    0
  );

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/orders", {
        orderItems: cart.map((item) => ({
          ...item,
          product: item._id,
          qty: item.quantity,
        })), // Ensure 'qty' is passed
        shippingAddress: { address, city, postalCode },
        totalPrice: subtotal,
      });
      clearCart();
      navigate("/my-orders");
    } catch (error) {
      console.error("Order placement error:", error.response); // Log the full error
      alert("Failed to place order. Check console for details.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Box component="form" onSubmit={placeOrderHandler}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shipping Address
          </Typography>
          <TextField
            label="Address"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="City"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            label="Postal Code"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Order Summary
          </Typography>
          {/* This will now display the correct total */}
          <Typography variant="body1">Total: ${subtotal.toFixed(2)}</Typography>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Place Order
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
