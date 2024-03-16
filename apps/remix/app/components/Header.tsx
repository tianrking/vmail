import { Link } from "@remix-run/react";
import { VmailLogo } from "./icons/vmail";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  return (
    <div className="fixed top-0 z-20 h-20 w-full px-5 backdrop-blur-xl md:px-10 text-white flex items-center justify-between first-letter:shadow-sm">
      <Link to="/" className="font-bold flex items-center justify-center gap-3">
        <VmailLogo />
        <button className="cool-btn">
          <span>VMAIL.DEV</span>
        </button>
      </Link>

      <Link to="/about" className="ml-auto text-sm md:text-base">
        {t("About")}
      </Link>
      <Link to="/privacy" className="ml-3 md:ml-8 text-sm md:text-base">
        {t("Privacy")}
      </Link>
      <Link to="https://www.buymeacoffee.com/yesmore" target="_blank">
        <button className="py-1.5 px-3 md:px-5 ml-3 md:ml-8 text-sm md:text-base rounded-md bg-cyan-600 hover:opacity-90 disabled:cursor-not-allowed disabled:bg-zinc-500">
          {t("Donate")}
        </button>
      </Link>
    </div>
  );
}
