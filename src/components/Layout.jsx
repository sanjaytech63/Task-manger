import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Layout = ({ children }) => {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className=" bg-gray-50"> {children} </main>
        <Footer />
      </div>
    );
  };
  
  export default Layout;