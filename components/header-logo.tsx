import { Logo } from "@/icons/Logo";
import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link href="/" aria-label="click and go to home" className="outline-none">
      <div className="items-center hidden lg:flex">
        <Logo size={49} />
        <p className="font-semibold text-white text-2xl ml-2.5">Finance</p>
      </div>
    </Link>
  );
}
