import { useState, useEffect, createContext, useCallback } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { docClient } from "../aws/awsClient";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      Key: { id: id, name: name },
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
    const datetime = format(new Date(), "MM-dd-yyyy");
    const id = bills.length + 1;
    const params = {
      TableName: "bills",
      Item: {
        id: id.toString(),
        name: name,
        amount: amount,
        date: datetime,
      },
    };

    try {
      await docClient.put(params).promise();
      setName("");
      setAmount("");
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
        name,
        amount,
        setName,
        setAmount,
        handleSubmit,
        handleSearch,
        searchResults,
        search,
        setSearchResults,
        fetchItems,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
