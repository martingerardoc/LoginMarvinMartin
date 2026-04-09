import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ClienteHome from "./pages/ClienteHome";
import ProductosAdmin from "./pages/ProductosAdmin";
import CrearProducto from "./pages/CrearProducto";
import ProductosCliente from "./pages/ProductosCliente";
import Carrito from "./pages/Carrito";
import MisOrdenes from "./pages/MisOrdenes";
import PrivateRoute from "./routes/PrivateRoute";
import React from "react";
import { useState } from "react";
import { AdminProvider } from "./context/useAdminContext";

export default function App() {
  function PrivateRouteCliente({ children }) {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("user_rol");

    if (!token) {
      return <Navigate to="/Login" />;
    }

    return rol === "admin" ? <Navigate to="/" /> : children;
  }

  function PrivateRouteAdministrador({ children }) {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("user_rol");

    if (!token) {
      return <Navigate to="/Login" />;
    }

    return rol === "cliente" ? <Navigate to="/cliente" /> : children;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <PrivateRouteAdministrador>
            <AdminProvider>
              <Home />
            </AdminProvider>
          </PrivateRouteAdministrador>
        }
      ></Route>

      <Route
        path="/productos"
        element={
          <PrivateRoute role="admin">
            <ProductosAdmin />
          </PrivateRoute>
        }
      />

      <Route
        path="/productos/nuevo"
        element={
          <PrivateRoute role="admin">
            <CrearProducto />
          </PrivateRoute>
        }
      />
      <Route
        path="/cliente"
        element={
          <PrivateRoute role="cliente">
            <ClienteHome />
          </PrivateRoute>
        }
      />

      <Route
        path="/cliente/productos"
        element={
          <PrivateRoute role="cliente">
            <ProductosCliente />
          </PrivateRoute>
        }
      />

      <Route
        path="/carrito"
        element={
          <PrivateRoute role="cliente">
            <Carrito />
          </PrivateRoute>
        }
      />

      <Route
        path="/productos"
        element={
          <PrivateRoute role="admin">
            <ProductosAdmin />
          </PrivateRoute>
        }
      />

      <Route
        path="/productos/nuevo"
        element={
          <PrivateRoute role="admin">
            <CrearProducto />
          </PrivateRoute>
        }
      />
      <Route
        path="/mis-ordenes"
        element={
          <PrivateRouteCliente>
            <MisOrdenes />
          </PrivateRouteCliente>
        }
      />
    </Routes>
  );
}
