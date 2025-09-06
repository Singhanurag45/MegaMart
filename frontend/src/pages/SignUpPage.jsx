// src/pages/SignUpPage.jsx

import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import api from "../api/axios";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Divider,
  Link,
  Stack,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../../assets/Logo.jpg";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  width: "100%",
  margin: "auto",
  padding: theme.spacing(5),
  borderRadius: "12px",
  boxShadow: "0 0 20px rgba(0,0,0,0.15)",
  background: "#ffffff",
}));

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/signin", {
        state: { message: "Registration successful! Please sign in." },
      });
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        p: 2,
      }}
    >
      <StyledCard>
        {/* 👇 FIX: Changed <Typography> to <Box> to prevent nesting error */}
        <Box
          className="flex items-center justify-center gap-[4px]"
          sx={{ mb: 3 }}
        >
          <img
            src={logo}
            alt="MegaMart Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-red-600">Mega</span>
            <span className="text-blue-600">Mart</span>
          </h1>
        </Box>
        {/* 👇 END FIX */}

        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
        >
          Create an Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSignUp}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Full name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              inputProps={{ minLength: 6 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign up"}
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Stack spacing={1}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{ textTransform: "none" }}
          >
            Sign up with Google
          </Button>
        </Stack>

        <Typography align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/signin" underline="hover">
            Sign in
          </Link>
        </Typography>
      </StyledCard>
    </Box>
  );
}
