import { useContext } from "react";
import DataContext from "./context/DataContext";

export default function NewBill() {
  const { name, amount, setName, setAmount, handleSubmit } =
    useContext(DataContext);

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Loan Amount: </label>
          <input
            id="name"
            type="number"
            placeholder="Loan Amount"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
