import { Link } from "react-router-dom";

const Feed = ({ bill }) => {
  return (
    <article className="bill">
      <Link to={`/bills/${bill.id}`}>
        <h2>Bill no: {bill.id}</h2>
        <h3>Name: {bill.name}</h3>
        <p>Date: {bill.date}</p>
      </Link>
      <p>Loan amount: {bill.amount}</p>
    </article>
  );
};

export default Feed;
