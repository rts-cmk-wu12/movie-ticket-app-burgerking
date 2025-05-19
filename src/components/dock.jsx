import Icons from "../utils/Icons"; // Capital I
import "../styles/components/dock.scss";

export default function Dock() {
  return (
    <nav className='dock-nav' aria-label='Bottom Navigation'>
      <ul className='dock-list'>
        <li>
          <Icons.home size={24} aria-label='Home' />
        </li>
        <li>
          <Icons.compass size={24} aria-label='Explore' />
        </li>
        <li>
          <Icons.bookmark size={24} aria-label='Bookmarks' />
        </li>
        <li>
          <Icons.user size={24} aria-label='Profile' />
        </li>
      </ul>
    </nav>
  );
}
