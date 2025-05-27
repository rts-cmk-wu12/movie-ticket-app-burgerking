import { useLocation } from "react-router-dom";
import Dock from "./dock";

export default function Layout({ children }) {
  const location = useLocation();

  const dockPaths = ["/", "/explore", "/details", "/bookmarks"];

  const shouldShowDock = dockPaths.includes(location.pathname);

  return (
    <>
      <main className={shouldShowDock && "main"}>{children}</main>
      {shouldShowDock && <Dock />}
    </>
  );
}
