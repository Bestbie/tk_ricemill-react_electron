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
import DetailWeighticketPurchase from "./pages/WeighTicket/DetailWeighticketPurchase";
import DetailEQuipment from "./pages/Equipment/DetailEQuipment";
import CreateFinance from "./pages/Finance/CreateFinance";
import EditFinance from "./pages/Finance/EditFinance";
import IndexStock from "./pages/Stock/IndexStock";
import DispatchStock from "./pages/Stock/DispatchStock";
import DetailStock from "./pages/Stock/DetailStock";
import AdmitStock from "./pages/Stock/AdmitStock";
import EditStock from "./pages/Stock/EditStock";
import DetailPurchase from "./pages/Purchase/DetailPurchase";
import IndexCreditor from "./pages/Creditor/IndexCreditor";
import CreateCreditor from "./pages/Creditor/CreateCreditor";
import EditCreditor from "./pages/Creditor/EditCreditor";
import DetailWeighticketSale from "./pages/WeighTicket/DetailWeighticketSale";
import IndexDebtor from "./pages/Debtor/IndexDebtor";
import DetailSale from "./pages/Sale/DetailSale";
import CreateDebtor from "./pages/Debtor/CreateDebtor";
import EditDebtor from "./pages/Debtor/EditDebtor";

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
  <div className="flex flex-col h-screen overflow-hidden bg-white text-black">
    {/* Navbar */}
    <Navbar toggleSidebar={toggleSidebar} />

    {/* Main content */}
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      {/* <Sidenav isOpen={isSidebarOpen} /> */}

      {/* Page content */}
      <div className="flex-1 p-4 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/weigh_ticket" element={<IndexWeighTicket />} />
          <Route path="/create_weigh_ticket" element={<CreateWeighticket />} />
          <Route path="/edit_weigh_ticket/:id" element={<EditWeighticket />} />
          <Route path="/detail_weighticket_purchase/:id" element={<DetailWeighticketPurchase />} />
          <Route path="/detail_weighticket_sale/:id" element={<DetailWeighticketSale />} />

          <Route path="/purchase" element={<IndexPurchase />} />
          <Route path="/detail_purchase/:id" element={<DetailPurchase />} />

          <Route path="/sale" element={<IndexSale />} />
          <Route path="/detail_sale/:id" element={<DetailSale />} />

          <Route path="/equipment" element={<IndexEquipment />} />
          <Route path="/detail_equipment/:id" element={<DetailEQuipment />} />

          <Route path="/finance" element={<IndexFinance />} />
          <Route path="/create_finance" element={<CreateFinance />} />
          <Route path="/edit_finance/:id" element={<EditFinance />} />

          <Route path="/stock" element={<IndexStock />} />
          <Route path="/edit_stock/:id" element={<EditStock />} />
          <Route path="/admit_stock/:id" element={<AdmitStock />} />
          <Route path="/dispatch_stock/:id" element={<DispatchStock />} />
          <Route path="/detail_stock/:id" element={<DetailStock />} />

          <Route path="/creditor" element={<IndexCreditor />} />
          <Route path="/create_creditor" element={<CreateCreditor />} />
          <Route path="/edit_creditor/:id" element={<EditCreditor />} />

          <Route path="/debtor" element={<IndexDebtor />} />
          <Route path="/create_debtor" element={<CreateDebtor />} />
          <Route path="/edit_debtor/:id" element={<EditDebtor />} />
        </Routes>
      </div>
    </div>

    {/* Footer */}
    <Footer />
  </div>
);
};

export default App;
