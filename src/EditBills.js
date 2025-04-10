import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function EditBills() {
  const navigate = useNavigate();
  const { bills, fetchItems } = useContext(DataContext);
  const { id } = useParams();
  const bill = bills.find((bill) => bill.id.toString() === id);
  const [editedData, setEditedData] = useState({
    name: bill.name,
    date: bill.date,
    type: bill.type,
    amount: bill.amount,
    address: bill.address,
    itemDetails: bill.itemDetails,
    quantity: bill.quantity,
    weight: bill.weight,
    contact: bill.contact,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleEdit = async (id) => {
    const formattedDate = format(editedData.date, "MM-dd-yyyy");
    const updatedBill = {
      name: editedData.name,
      date: formattedDate,
      type: editedData.type,
      amount: editedData.amount,
      address: editedData.address,
      itemDetails: editedData.itemDetails,
      quantity: editedData.quantity,
      weight: editedData.weight,
      contact: editedData.contact,
    };
    try {
      const response = await fetch(`http://localhost:5000/api/bills/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBill),
      });

      if (!response.ok) {
        throw new Error(`Failed to update bill: ${response.status}`);
      }

      await fetchItems(); // Refresh updated data
      navigate("/bills"); // Navigate after update
    } catch (error) {
      console.error("Error updating bill:", error);
      alert("Failed to update the bill. Please try again.");
    }
  };

  return (
    <div className="form-container">
      {bill && (
        <>
          {" "}
          <h2>Edit Bill</h2>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={format(editedData.date, "yyyy-MM-dd")}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Item Type:</label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="gold"
                  checked={editedData.type === "gold"}
                  onChange={handleChange}
                />
                Gold
              </label>

              <label>
                <input
                  type="radio"
                  name="type"
                  value="silver"
                  checked={editedData.type === "silver"}
                  onChange={handleChange}
                />
                Silver
              </label>
            </div>

            <div className="form-group">
              <label className="block">Amount:</label>
              <input
                type="number"
                name="amount"
                value={editedData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={editedData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Item Details:</label>
              <input
                type="text"
                name="itemDetails"
                value={editedData.itemDetails}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={editedData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Weight:</label>
              <input
                type="number"
                name="weight"
                value={editedData.weight}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Contact:</label>
              <input
                type="text"
                name="contact"
                value={editedData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="submit-btn"
              type="submit"
              onClick={() => handleEdit(bill.id)}
            >
              Save
            </button>
          </form>{" "}
        </>
      )}
    </div>
  );
}
