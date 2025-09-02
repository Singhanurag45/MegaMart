import React, { useState } from "react"; // ⬅️ import useState
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Link,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

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
  // 1. Add state for all form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Create a handler function for sign-up
  const handleSignUp = () => {
    // This is where you would call your backend API to create a new user
    console.log("Signing up with:", { fullName, email, password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <StyledCard>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "bold", color: "#3b82f6" }}
        >
          Sitemark
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Sign up
        </Typography>

        <Stack spacing={2}>
          {/* 3. Connect state to the input fields */}
          <TextField
            fullWidth
            label="Full name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox />}
            label="I want to receive updates via email."
          />

          {/* 4. Attach the handler to the button's onClick event */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSignUp}
          >
            Sign up
          </Button>
        </Stack>

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
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{ textTransform: "none" }}
          >
            Sign up with Facebook
          </Button>
        </Stack>

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/signin" underline="hover">
            Sign in
          </Link>
        </Typography>
      </StyledCard>
    </Box>
  );
}
