// frontend/src/pages/ProfilePage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import WcIcon from "@mui/icons-material/Wc";
import CakeIcon from "@mui/icons-material/Cake";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  background: "#ffffff",
  textAlign: "center",
}));

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPhone, setEditPhone] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        setUser(response.data);
      } catch (err) {
        setError("Could not fetch profile. Please log in again.");
        setTimeout(() => {
          localStorage.clear();
          navigate("/signin");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
    window.dispatchEvent(new Event("storage"));
  };

  const handleEditOpen = () => {
    setEditName(user?.name || "");
    setEditEmail(user?.email || "");
    setEditGender(user?.gender || "");
    setEditAge(user?.age || "");
    setEditAddress(user?.address || "");
    setEditPhone(user?.phone || "");
    setOpenEdit(true);
  };


   const handleEditSave = async () => {
     try {
       const response = await api.put("/auth/profile", {
         name: editName,
         email: editEmail,
         gender: editGender,
         age: editAge,
         address: editAddress,
         phone: editPhone,
       });
       setUser(response.data);
       setOpenEdit(false);
     } catch (err) {
       alert("Failed to update profile.");
     }
   };


  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2, mt: 6 }}>
      <StyledCard>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 90,
            height: 90,
            fontSize: "2rem",
            mx: "auto",
            mb: 2,
          }}
        >
          {getInitials(user?.name)}
        </Avatar>

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Welcome to your profile 🎉
        </Typography>

        <Divider sx={{ my: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {user && !error && (
          <Stack spacing={2} alignItems="flex-start">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon color="primary" />
              <Typography variant="body1">
                <strong>Name:</strong> {user.name}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon color="secondary" />
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WcIcon color="action" />
              <Typography variant="body1">
                <strong>Gender:</strong> {user.gender || "Not set"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CakeIcon color="warning" />
              <Typography variant="body1">
                <strong>Age:</strong> {user.age || "Not set"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HomeIcon color="success" />
              <Typography variant="body1">
                <strong>Address:</strong> {user.address || "Not set"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon color="info" />
              <Typography variant="body1">
                <strong>Phone:</strong> {user.phone || "Not set"}
              </Typography>
            </Box>
          </Stack>
        )}

        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditOpen}
            sx={{ flex: 1 }}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ flex: 1, fontWeight: "bold" }}
          >
            Logout
          </Button>
        </Stack>
      </StyledCard>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Gender"
              value={editGender}
              onChange={(e) => setEditGender(e.target.value)}
              fullWidth
            />
            <TextField
              label="Age"
              type="number"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
              fullWidth
            />
            <TextField
              label="Address"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              fullWidth
            />
            <TextField
              label="Phone"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
