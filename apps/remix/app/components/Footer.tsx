import { Link } from "@remix-run/react";
import Twitter from "./icons/Twitter";
import Github from "./icons/GitHub";
import { MailIcon } from "icons";

export default function Footer() {
  return (
    <div className="text-white w-full mt-auto flex flex-col items-center justify-between px-5 pt-16 mb-10 md:px-10 mx-auto sm:flex-row">
      <a href="/" className="text-xl font-black leading-none select-none logo">
        Vmail.DEV
      </a>
      <a
        className="mt-4 text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0"
        href="https://vmail.dev"
        target="_blank">
        {" "}
        © 2024 Products of Yesmore{" "}
      </a>
      <div className="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
        <Link
          to="mailto:team@inke.app"
          title="Email"
          className="text-gray-400 hover:text-gray-500">
          <MailIcon className="w-6 h-6" />
        </Link>
        <Link
          to="https://twitter.com/yesmoree"
          target="_blank"
          title="Twitter"
          className="text-gray-400 hover:text-gray-500">
          <Twitter />
        </Link>
        <Link
          to="https://github.com/yesmore/vmail"
          target="_blank"
          title="GitHub"
          className="text-gray-400 hover:text-gray-500">
          <Github />
        </Link>
      </div>
    </div>
  );
}
