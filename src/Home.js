import { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import { format, differenceInMonths } from "date-fns";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { MdDownload } from "react-icons/md";

export default function Home() {
  const generatePDF = (currentBill) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Jewelry Loan Bill", 20, 20);
    doc.setFontSize(12);
    doc.text(`Customer Name: ${currentBill.name}`, 20, 40);
    doc.text(`Loan Amount: ${currentBill.amount}`, 20, 50);
    doc.text(`Interest Rate: ${currentBill.type === "gold" ? 2 : 3}%`, 20, 60);
    doc.text(`Loan Start Date: ${currentBill.date}`, 20, 70);
    doc.text("_______________", 20, 80);
    doc.text("_______________", 20, 90);
    doc.text(`Loan Amount: ${currentBill.amount}`, 20, 100);
    doc.text(`Interest Amount: ${sum}`, 20, 110);
    doc.text(`Total Amount: ${+billAmount + sum}`, 20, 120);
    doc.save(`Bill_${currentBill.name}.pdf`);
  };
  const { bills } = useContext(DataContext);
  const [billNum, setBillNum] = useState("");
  const [sum, setSum] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [currentBill, setCurrentBill] = useState([]);

  const [totalAmount, setTotalAmount] = useState("");
  const handleCalculate = (e) => {
    e.preventDefault();
    const bill = bills.find((bill) => bill.id === billNum);
    setCurrentBill(bill);
    setBillAmount(bill.amount);
    const currentdatetime = format(new Date(), "MM-dd-yyyy");
    const currentdate = format(new Date(), "dd");
    const date = format(bill.date, "dd");
    let monthsdiff = 0;
    let interest;
    if (bill.type === "gold") interest = 2;
    else interest = 3;

    if (date > currentdate) {
      monthsdiff = monthsdiff + differenceInMonths(currentdatetime, bill.date);
    } else if (date === currentdate) {
      monthsdiff =
        monthsdiff + differenceInMonths(currentdatetime, bill.date) - 1;
    } else {
      monthsdiff = monthsdiff + differenceInMonths(currentdatetime, bill.date);
    }
    if (monthsdiff < 0) {
      setSum(0);
    } else {
      setSum(((monthsdiff * interest) / 100) * bill.amount);
    }

    monthsdiff = 0;
    setTotalAmount(+sum + billAmount);
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label htmlFor="id">Enter Bill no: </label>
          <input
            type="number"
            id="id"
            required
            placeholder="Bill no"
            value={billNum}
            onChange={(e) => {
              setBillNum(e.target.value);
              setTotalAmount(0);
            }}
          />
        </div>

        <button className="submit-btn" type="submit">
          Calculate
        </button>
      </form>
      <br />
      {totalAmount && billNum ? (
        <div className="form-group">
          <label htmlFor="sum">Loan amount = {billAmount}</label>
          <label htmlFor="sum">Interest = {sum}</label>
          <label htmlFor="sum">Total amount = {+billAmount + sum}</label>
        </div>
      ) : undefined}
      {totalAmount && billNum ? (
        <ul className="item-list">
          <li className="list-item">
            <Link to={`/bills/${currentBill.id}`}>
              <h2>Bill no: {currentBill.id}</h2>
              <h3>Name: {currentBill.name}</h3>
              <p>Date: {currentBill.date}</p>
            </Link>
            <p>Loan amount: {currentBill.amount}</p>
            <button onClick={() => generatePDF(currentBill)}>
              <MdDownload />
              Download Bill
            </button>
          </li>
        </ul>
      ) : undefined}
    </div>
  );
}
