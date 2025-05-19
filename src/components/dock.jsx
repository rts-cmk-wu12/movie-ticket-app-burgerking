import Icons from "../utils/Icons";
import { NavLink } from "react-router-dom";

export default function Dock() {
  return (
    <nav className='dock-nav' aria-label='Bottom Navigation'>
      <ul className='dock-list'>
        <li>
          <NavLink to='/' className='dock-link'>
            <Icons.home size={24} aria-label='Home' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/explore' className='dock-link'>
            <Icons.compass size={24} aria-label='Explore' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/bookmarks' className='dock-link'>
            <Icons.bookmark size={24} aria-label='Bookmarks' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile' className='dock-link'>
            <Icons.user size={24} aria-label='Profile' />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
