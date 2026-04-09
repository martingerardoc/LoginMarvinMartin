import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token")
  const userRole = localStorage.getItem("user_rol")

  if (!token) return <Navigate to="/login" />

  if (role && role !== userRole) {
    return <Navigate to={userRole === "admin" ? "/" : "/cliente"} />
  }

  return children
}