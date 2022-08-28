import { Paper } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Paper style={{ minHeight: "100vh" }}>
      <Outlet />
    </Paper>
  );
}
