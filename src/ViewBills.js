import { useContext, useEffect } from "react";
import DataContext from "./context/DataContext";
import { Link } from "react-router-dom";

export default function ViewBills() {
  const { bills, search, handleSearch, searchResults, setSearchResults } =
    useContext(DataContext);
  useEffect(() => {
    setSearchResults(bills);
  }, [setSearchResults, bills]);

  return (
    <div className="list-container">
      <h2>Bills List</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      {searchResults.length ? (
        search !== "" ? (
          <ul className="item-list">
            {searchResults.map((bill) => (
              <li key={bill.id} className="list-item">
                <Link to={`/bills/${bill.id}`}>
                  <h2>Bill no: {bill.id}</h2>
                  <h3>Name: {bill.name}</h3>
                  <p>Date: {bill.date}</p>
                </Link>
                <p>Loan amount: {bill.amount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="item-list">
            {bills.map((bill) => (
              <li key={bill.id} className="list-item">
                <Link to={`/bills/${bill.id}`}>
                  <h2>Bill no: {bill.id}</h2>
                  <h3>Name: {bill.name}</h3>
                  <p>Date: {bill.date}</p>
                </Link>
                <p>Loan amount: {bill.amount}</p>
              </li>
            ))}
          </ul>
        )
      ) : (
        <p>Bill not found</p>
      )}
    </div>
  );
}
