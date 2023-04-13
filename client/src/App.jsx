import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, CreatePost, Landing, Header } from "./page";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import PaymentPage from "./page/PaymentPage";
import Completion from "./page/Completion";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/pay" element={<PaymentPage />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
