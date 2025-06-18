import { Link } from 'react-router-dom';

/* Links to other pages for Footer*/
function Footer() {
  return (
    <footer style={{ padding: '20px', position: 'absolute', right: '10px', top: '0px', fontSize: '20px'}}>
      <p>
        <Link to="/" style={{ margin: '0 10px', color: 'aliceblue', textDecoration: 'underline' }}>
          Home
        </Link>
        <Link to="/about" style={{ margin: '0 10px', color: 'aliceblue', textDecoration: 'underline' }}>
          About
        </Link>
        <Link to="/contact" style={{ margin: '0 10px', color: 'aliceblue', textDecoration: 'underline' }}>
          Contact
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
