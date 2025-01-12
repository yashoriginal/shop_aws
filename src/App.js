import "./index.css";
import NewBill from "./NewBill";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import { DataProvider } from "./context/DataContext";
import BillPage from "./BillPage";
import ViewBills from "./ViewBills";
import EditBills from "./EditBills";

export default function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newbill" element={<NewBill />} />
          <Route path="/bills" element={<ViewBills />} />
          <Route path="/bills/:id" element={<BillPage />}></Route>
          <Route path="/editbills/:id" element={<EditBills />}></Route>
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}
