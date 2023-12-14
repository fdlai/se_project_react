import "./Footer.css";

function Footer({ className = "" }) {
  return (
    <footer className={`footer ${className}`}>
      <p className="footer__text">Developed by Fred Lai</p>
      <p className="footer__copyright">2023</p>
    </footer>
  );
}

export default Footer;
