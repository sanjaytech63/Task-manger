import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Todo from "./pages/Todo"
import About from "./pages/About"
import Login from "./pages/Login"
import Contact from "./pages/Contact"
import Services from "./pages/Services"
import Local from "./pages/LocalStorageDemo"
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/local" element={<Local />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
