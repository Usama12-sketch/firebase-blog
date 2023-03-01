
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from './Navbar';

const Layout = ({ children }) => {
 
  return (
    <div>
      <Nav link1="Ccvtbug"></Nav>
   
      <main>{children}</main>
    </div>
  );
};

export default Layout;
