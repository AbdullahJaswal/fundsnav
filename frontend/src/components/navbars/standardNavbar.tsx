import Image from "next/image";
import Link from "next/link";
import { TbLogin2 } from "react-icons/tb";
import { CgMenu } from "react-icons/cg";
import ThemeButton from "@/components/misc/themeButton";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavbarButtons from "@/components/misc/navbarButtons";
import SignOutButton from "@/components/misc/signoutButton";

const menuItems: { path: string; label: string }[] = [
  // { path: "/dashboard/overview", label: "Dashboard" },
  { path: "/dashboard/mutual-funds", label: "Dashboard" },
  { path: "/about", label: "About" },
  // { path: "/contact", label: "Contact" },
];

export default function StandardNavbar() {
  const pathname = usePathname();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="navbar navbar-bg-blur bg-base-100/60 sticky top-0 z-50 border-b border-base-300">
      <div className="mx-auto w-full">
        <div className="flex-1">
          <div className="dropdown">
            {isAuthenticated && pathname.startsWith("/dashboard") ? (
              <label
                htmlFor="dashboard-drawer"
                className="flex lg:hidden btn btn-ghost hover:bg-primary/10 btn-circle text-primary border-0 drawer-button"
              >
                <CgMenu className="w-5 h-5" />
              </label>
            ) : (
              <>
                <label tabIndex={0} className="btn btn-ghost hover:bg-primary/10 btn-circle text-primary lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-md dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-52 border border-base-300"
                >
                  <NavbarButtons menuItems={menuItems} pathname={pathname} isAuthenticated={isAuthenticated} />
                </ul>
              </>
            )}
          </div>

          <Link
            href="/"
            className="btn btn-ghost hover:scale-105 hover:bg-primary/10 normal-case font-extrabold text-lg"
          >
            <Image src={"/logo.webp"} alt="FundsNav Logo" width={24} height={24} quality={40} priority={true} />
            FundsNav
          </Link>
        </div>

        <div className="mr-4 hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavbarButtons menuItems={menuItems} pathname={pathname} isAuthenticated={isAuthenticated} />
          </ul>

          <div className="divider divider-horizontal h-8 my-auto m-0" />
        </div>

        <div className="flex gap-4">
          <ThemeButton />

          {isAuthenticated ? (
            <SignOutButton />
          ) : (
            <Link className="btn btn-outline btn-sm btn-secondary font-bold text-xxs hover:scale-105" href="/login">
              <TbLogin2 className="w-4 h-4" /> Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
