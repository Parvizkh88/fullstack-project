import Sidebar from "components/layout/Sidebar";
import ProductDataTable from "components/Product/ProductDataTable";
import UserDataTable from "components/User/UserDataTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "redux/hooks";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
    
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {activeTab === "products" ? <ProductDataTable /> : null}
       
        {activeTab === "users" ? <UserDataTable /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
