import "./Footer.css";

function Footer({ className = "" }) {
  return (
    <footer className={`footer ${className}`}>
      <p className="footer__text">Developed by Fred Lai</p>
      <p className="footer__copyright">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
