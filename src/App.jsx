import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import IndexWeighTicket from "./pages/WeighTicket/IndexWeighTicket";
import IndexPurchase from "./pages/Purchase/IndexPurchase";
import IndexSale from "./pages/Sale/IndexSale";
import IndexEquipment from "./pages/Equipment/IndexEquipment";
import IndexFinance from "./pages/Finance/IndexFinance";
import CreateWeighticket from "./pages/WeighTicket/CreateWeighticket";
import EditWeighticket from "./pages/WeighTicket/EditWeighticket";
import DetailWeighticket from "./pages/WeighTicket/DetailWeighticket";
import CreatePurchase from "./pages/Purchase/CreatePurchase";
import EditPurchase from "./pages/Purchase/EditPurchase";
import CreateSale from "./pages/Sale/CreateSale";
import EditSale from "./pages/Sale/EditSale";
import DetailEQuipment from "./pages/Equipment/DetailEQuipment";
import CreateFinance from "./pages/Finance/CreateFinance";
import EditFinance from "./pages/Finance/EditFinance";
import IndexStock from "./pages/Stock/IndexStock";
import DispatchStock from "./pages/Stock/DispatchStock";
import DetailStock from "./pages/Stock/DetailStock";
import AdmitStock from "./pages/Stock/AdmitStock";
import CreateStock from "./pages/Stock/CreateStock";
import EditStock from "./pages/Stock/EditStock";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {/* <Sidenav isOpen={isSidebarOpen} /> */}

        {/* Page content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/weigh_ticket" element={<IndexWeighTicket />} />
            <Route path="/create_weigh_ticket" element={<CreateWeighticket />} />
            <Route path="/edit_weigh_ticket/:id" element={<EditWeighticket />} />
            <Route path="/detail_weigh_ticket/:id" element={<DetailWeighticket />} />


            <Route path="/purchase" element={<IndexPurchase />} />
            <Route path="/create_purchase" element={<CreatePurchase />} />
            <Route path="/edit_purchase/:id" element={<EditPurchase />} />

            <Route path="/sale" element={<IndexSale />} />
            <Route path="/create_sale" element={<CreateSale />} />
            <Route path="/edit_sale/:id" element={<EditSale />} />

            <Route path="/equipment" element={<IndexEquipment />} />
            <Route path="/detail_equipment/:id" element={<DetailEQuipment />} />

            <Route path="/finance" element={<IndexFinance />} />
            <Route path="/create_finance" element={<CreateFinance />} />
            <Route path="/edit_finance/:id" element={<EditFinance />} />

            <Route path="/stock" element={<IndexStock />} />
            <Route path="/create_stock" element={<CreateStock />} />
            <Route path="/edit_stock/:id" element={<EditStock />} />
            <Route path="/admit_stock/:id" element={<AdmitStock />} />
            <Route path="/dispatch_stock/:id" element={<DispatchStock />} />
            <Route path="/detail_stock/:id" element={<DetailStock />} />

          </Routes>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
