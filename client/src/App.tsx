import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/pages/authPage";
import Dashboard from "./components/pages/dashboard";
import NotFound from "./components/pages/notFound";

function App() {
  return (
    <Routes>
      <Route element={<AuthPage />} path="/auth"/>
      <Route element={<Dashboard />} path="/dashboard"/>
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}

export default App;
