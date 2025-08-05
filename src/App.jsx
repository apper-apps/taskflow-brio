import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import AllTasks from "@/components/pages/AllTasks";
import TodayTasks from "@/components/pages/TodayTasks";
import UpcomingTasks from "@/components/pages/UpcomingTasks";
import CategoryTasks from "@/components/pages/CategoryTasks";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AllTasks />} />
            <Route path="today" element={<TodayTasks />} />
            <Route path="upcoming" element={<UpcomingTasks />} />
            <Route path="category/:categoryId" element={<CategoryTasks />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="toast-custom"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;