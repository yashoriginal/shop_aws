import { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import { format, differenceInMonths } from "date-fns";

export default function Home() {
  const { bills } = useContext(DataContext);
  const [billNum, setBillNum] = useState("");
  const [sum, setSum] = useState("");
  const [billAmount, setBillAmount] = useState("");

  const [totalAmount, setTotalAmount] = useState("");
  const handleCalculate = () => {
    const bill = bills.find((bill) => bill.id === billNum);
    setBillAmount(bill.amount);
    const currentdatetime = format(new Date(), "MM-dd-yyyy");
    const currentdate = format(new Date(), "dd");
    const date = format(bill.date, "dd");
    let monthsdiff = 0;
    if (date > currentdate) {
      monthsdiff = monthsdiff + differenceInMonths(currentdatetime, bill.date);
    } else if (date === currentdate) {
      monthsdiff =
        monthsdiff + differenceInMonths(currentdatetime, bill.date) - 1;
    } else {
      monthsdiff = monthsdiff + differenceInMonths(currentdatetime, bill.date);
    }
    console.log(monthsdiff);
    if (monthsdiff < 0) {
      setSum(0);
    } else {
      setSum(((monthsdiff * 2) / 100) * bill.amount);
    }

    monthsdiff = 0;
    setTotalAmount(+sum + billAmount);
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
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
        {totalAmount && billNum ? (
          <div className="form-group">
            <label htmlFor="sum">Loan amount = {billAmount}</label>
            <label htmlFor="sum">Intereset = {sum}</label>
            <label htmlFor="sum">Total amount = {+billAmount + sum}</label>
          </div>
        ) : undefined}

        <button
          className="submit-btn"
          type="submit"
          onClick={() => handleCalculate()}
        >
          Calculate
        </button>
      </form>
    </div>
  );
}
