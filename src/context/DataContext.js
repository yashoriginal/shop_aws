import { useState, useEffect, createContext, useCallback } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { docClient } from "../aws/awsClient";

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
    const params = {
      TableName: "bills",
    };

    try {
      const data = await docClient.scan(params).promise();
      setBills(data.Items || []);
    } catch (err) {
      console.error("Error fetching items:", err);
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
    const params = {
      TableName: "bills",
      Key: { id },
    };

    try {
      await docClient.delete(params).promise();
      fetchItems();
      navigate("/bills");
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datetime = format(formData.date, "MM-dd-yyyy");
    const id = bills.length + 1;
    const params = {
      TableName: "bills",
      Item: {
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
      },
    };

    try {
      await docClient.put(params).promise();
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
      fetchItems();
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
