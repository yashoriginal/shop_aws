import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/newbill">New Bill</Link>
        </li>
        <li>
          <Link to="/bills">View Bills</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
