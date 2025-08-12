import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import deliveryIcon from "/food-delivery.png";
import DefineTheme from "../define-theme/DefineTheme";
import { useAuthStore } from "../../stores/useAuthStore";
import Logout from "../logout/Logout";

interface IUser {
  photoURL?: string | null;
  // Add other user properties here as needed
}

const Header: React.FC = () => {
  const { user } = useAuthStore() as { user: IUser | null };
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window === "undefined") return;

      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setShow(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) setShow(false);
      else setShow(true);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const locationButton = (
    <button className="cursor-pointer" aria-label="Select your location">
      <span className="hidden md:inline">Select</span> Your Location
    </button>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-transform duration-300 z-50
        py-3 bg-base-300/80 backdrop-blur-md
        ${show ? "translate-y-0" : "-translate-y-full"}
        `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-3 sm:px-5 flex justify-between items-center">
        {/* Left side: Logo and brand */}
        <Link to="/" aria-label="Homepage">
          <div className="flex items-center gap-3">
            <img src={deliveryIcon} alt="Loizar logo" className="w-8 sm:w-10" />
            <h1 className="text-lg sm:text-2xl md:text-2xl bg-base-100 px-5 py-1 rounded font-Lobster text-primary">
              Loizar
            </h1>
          </div>
        </Link>

        {/* Right side: Navigation buttons and user menu */}
        <div className="flex items-center gap-4">
          {/* Location button visible only if user logged in */}
          <div className="hidden sm:flex btn">{locationButton}</div>

          {/* Authentication buttons (Login/Register) if no user */}
          {!user && (
            <>
              <Link to="/login">
                <button type="button" className="btn btn-neutral">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="btn btn-outline">
                  Register
                </button>
              </Link>
            </>
          )}

          {/* User avatar dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              className="btn btn-ghost btn-circle avatar text-center"
            >
              <div className="w-7 sm:w-10 rounded-full overflow-hidden">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User avatar"
                    className="rounded-full object-cover w-full h-full"
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full border border-primary/40 rounded-full">
                    <UserIcon size={24} aria-hidden="true" />
                  </span>
                )}
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow"
              role="menu"
              aria-label="User menu"
            >
              {user && (
                <>
                  <li role="menuitem">
                    <a href="#" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li role="menuitem">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                </>
              )}
              <li role="menuitem" className="sm:hidden">
                {locationButton}
              </li>
              <li role="menuitem">
                <DefineTheme />
              </li>
              <li role="menuitem">
                <Link to="/settings">Settings</Link>
              </li>
              {user && (
                <li role="menuitem">
                  <Logout />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
