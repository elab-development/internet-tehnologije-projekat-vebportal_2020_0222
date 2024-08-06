import React from 'react'
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
          <div className="footer-links">
            <Link className="footer-link" to="/articles" state={{ id: 1 }}>
              NBA
            </Link>
            <Link className="footer-link" to="/articles" state={{ id: 2 }}>
              Evroliga
            </Link>
            <Link className="footer-link" to="/articles" state={{ id: 3 }}>
              Evrokup
            </Link>
          </div>
          <p>Sportski portal. Sva prava zadržana.</p>
        </footer>
      );
}

export default Footer