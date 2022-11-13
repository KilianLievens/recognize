import { Popover } from "@headlessui/react";
import logo from "../public/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span className="sr-only">Recognize</span>
            <Image src={logo} alt="Picture of the author" width={250} />
          </a>
        </div>
      </div>
    </header>
  );
}
