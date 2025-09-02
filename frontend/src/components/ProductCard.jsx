// src/components/ProductCard.jsx

import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function ProductCard({ product, addToCart }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 400, // 👈 Card height remains 400 (as requested in the previous step, not the 420 I suggested last)
        maxWidth: "100%",
        boxShadow: "lg",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "xl",
        },
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="4/3" sx={{ minWidth: 180, height: 220 }}>
          {" "}
          {/* 💡 Increased image height (was 200) */}
          <img
            src={product.image}
            loading="lazy"
            alt={product.name}
            style={{ objectFit: "cover" }}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 1, // 💡 Reduced padding to fit larger image within fixed card height (was 1.5)
        }}
      >
        <Link
          component={RouterLink}
          to={`/product/${product._id}`}
          overlay
          endDecorator={<ArrowOutwardIcon />}
          sx={{
            fontWeight: "md",
            fontSize: "0.9rem",
            color: "text.primary",
            "&:hover": { textDecoration: "none", color: "primary.500" },
          }}
        >
          {product.name}
        </Link>

        <Typography level="body-sm" sx={{ fontSize: "0.8rem", flexGrow: 1 }}>
          {product.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography
            level="title-lg"
            sx={{ fontWeight: "lg" }}
            endDecorator={
              <Chip component="span" size="sm" variant="soft" color="success">
                Best Price
              </Chip>
            }
          >
            ${product.price}
          </Typography>
          <Button
            variant="soft"
            color="primary"
            size="sm"
            onClick={handleAddToCart}
            sx={{
              borderRadius: "50%",
              width: 36,
              height: 36,
              p: 0,
              minWidth: 36,
            }}
          >
            <AddShoppingCartIcon />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
