import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPage from "./layout/LayoutPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RootLayout from "./layout/RootLayout";
import Users from "./pages/Users";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<LayoutPage />}>
              <Route index element={<Home />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
