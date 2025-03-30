import { useState, useEffect, createContext, useCallback } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    type: "gold",
    amount: "",
    address: "",
    itemDetails: "",
    weight: "",
    contact: "",
  });

  const navigate = useNavigate();

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bills");
      if (!response.ok) {
        throw new Error(`Failed to fetch bills: ${response.status}`);
      }
      const data = await response.json();
      setBills(data.bills);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredBills = bills.filter(
      (bill) =>
        bill.name.toLowerCase().includes(search.toLowerCase()) ||
        bill.amount.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredBills);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/bills/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete bill: ${response.status}`);
      }

      await fetchItems(); // Refresh the table after deleting
      navigate("/bills"); // Redirect after delete
    } catch (error) {
      console.error("Error deleting bill:", error);
      alert("Failed to delete the bill. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datetime = format(formData.date, "MM-dd-yyyy");
    const id = bills.length + 1;

    const itemData = {
      id: id.toString(),
      name: formData.name,
      date: datetime,
      type: formData.type,
      amount: formData.amount,
      address: formData.address,
      itemDetails: formData.itemDetails,
      quantity: formData.quantity,
      weight: formData.weight,
      contact: formData.contact,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error("Failed to create item");
      }

      setFormData({
        name: "",
        date: new Date().toISOString().split("T")[0],
        type: "silver",
        amount: "",
        address: "",
        itemDetails: "",
        quantity: "",
        weight: "",
        contact: "",
      });

      fetchItems(); // Refresh data after adding a new item
    } catch (err) {
      console.error("Error creating item:", err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        bills,
        setBills,
        handleDelete,
        handleSubmit,
        handleSearch,
        searchResults,
        search,
        setSearchResults,
        fetchItems,
        formData,
        setFormData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
