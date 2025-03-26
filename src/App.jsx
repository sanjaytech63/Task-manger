import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import About from "./pages/About";
import Login from "./pages/Login";
import Counter from "./pages/Counter";
import SpaceShooter from "./pages/SpaceShooter";
import Snake from "./pages/Snake";
import FlappyBird from "./pages/FlappyBird";
import SpaceEarth from "./pages/SpaceEarth";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Local from "./pages/LocalStorageDemo";
const App = () => {
  return (
    <Router>
      
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/space-earth" element={<SpaceEarth />} />
          <Route path="/space-shooter" element={<SpaceShooter />} />
          <Route path="/Snake" element={<Snake />} />
          <Route path="/flappy-bird" element={<FlappyBird />} />
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
