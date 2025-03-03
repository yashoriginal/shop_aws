import { useContext } from "react";
import DataContext from "./context/DataContext";

export default function NewBill() {
  const { handleSubmit, formData, setFormData } = useContext(DataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
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
              checked={formData.type === "gold"}
              onChange={handleChange}
            />
            Gold
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="silver"
              checked={formData.type === "silver"}
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
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Item Details:</label>
          <input
            type="text"
            name="itemDetails"
            value={formData.itemDetails}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={formData.qunatity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
