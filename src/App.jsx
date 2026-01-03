import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"; 
import AuthProvider from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound"; 
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Vavigate to="/login" replace   />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/restaurants/update" element={<UpdateRestaurant/>}/></Route>
          
          <Route element={<ProtectedRoute allowedRole="customer" />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          </Route>
<Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}