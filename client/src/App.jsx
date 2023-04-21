import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  CreatePost,
  Landing,
  PaymentPage,
  Completion,
  Chat,
} from "./page";
import { Header, ProtectedRoute } from "./components";
import "./App.css";

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
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
