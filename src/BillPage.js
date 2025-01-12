import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

export default function BillPage() {
  const { bills, handleDelete } = useContext(DataContext);
  const { id } = useParams();

  const bill = bills.find((bill) => bill.id === id);

  return (
    <div className="list-container">
      <ul className="item-list">
        {bill && (
          <li className="list-item">
            <h2>Bill no: {bill.id}</h2>
            <h3>Name: {bill.name}</h3>
            <p>Date: {bill.date}</p>
            <p>Loan amount: {bill.amount}</p>
            <Link to={`/editbills/${id}`}>
              <button className="submit-btn">Edit</button>
            </Link>

            <button
              className="submit-btn"
              onClick={() => handleDelete(bill.id)}
            >
              Delete
            </button>
          </li>
        )}
        {!bill && (
          <>
            <h2>Bill Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/bills">Visit to View Bils again</Link>
            </p>
          </>
        )}
      </ul>
    </div>
  );
}
