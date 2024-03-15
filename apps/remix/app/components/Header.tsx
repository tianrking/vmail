import { Link } from "@remix-run/react";
import { GithubIcon } from "icons";
import { VmailLogo } from "./icons/vmail";

export default function Header() {
  return (
    <div className="fixed top-0 z-10 h-20 w-full px-5 backdrop-blur-xl md:px-10 text-white flex items-center justify-between first-letter:shadow-sm">
      <Link to="/" className="font-bold flex items-center justify-center gap-3">
        <VmailLogo />
        <button className="cool-btn">
          <span>Vmail.DEV</span>
        </button>
      </Link>

      <Link to="/about" className="ml-auto text-sm md:text-base">
        About
      </Link>
      <Link to="/privacy" className="ml-3 md:ml-8 text-sm md:text-base">
        Privacy
      </Link>
      <Link to="/terms" className="ml-3 md:ml-8 text-sm md:text-base">
        Terms
      </Link>
    </div>
  );
}
