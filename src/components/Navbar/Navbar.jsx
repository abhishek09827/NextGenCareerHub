import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";

const Navbar = () => {
  const [hideMenu, seHideMenu] = useState(true);
  const { user } = useUser();
  return (
    <div style={{ display: "flex" }}>
      <nav className="navigation">
        <a href="/" className="brand-name">
          NextGen
        </a>
        <button className="hamburger" onClick={() => seHideMenu(!hideMenu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={hideMenu ? `navigation-menu` : `navigation-menu.expanded`}
        >
          <ul
            style={{ listStyle: "none", paddingRight: "10px" }}
            className={
              hideMenu ? `navigation-menu_ul` : `navigation-menu.expanded_ul`
            }
          >
            <li
              className={
                hideMenu ? `navigation-menu_li` : `navigation-menu.expanded_li`
              }
            >
              <a
                href="/home"
                className={
                  hideMenu
                    ? `navigation-menu_li_a`
                    : `navigation-menu.expanded_li_a`
                }
              >
                Home
              </a>
            </li>
            <li
              className={
                hideMenu ? `navigation-menu_li` : `navigation-menu.expanded_li`
              }
            >
              <a
                href="/about"
                className={
                  hideMenu
                    ? `navigation-menu_li_a`
                    : `navigation-menu.expanded_li_a`
                }
              >
                About
              </a>
            </li>
            <li
              className={
                hideMenu ? `navigation-menu_li` : `navigation-menu.expanded_li`
              }
            >
              <a
                href="/empower"
                className={
                  hideMenu
                    ? `navigation-menu_li_a`
                    : `navigation-menu.expanded_li_a`
                }
              >
                EmpowHer
              </a>
            </li>
            <li>
              {!user && (
                <Link
                  to="/sign"
                  className={
                    hideMenu
                      ? `navigation-menu_li_a`
                      : `navigation-menu.expanded_li_a`
                  }
                >
                  Sign In
                </Link>
              )}
            </li>
            <li>
              {!user ? (
                <Link
                  to="/auth"
                  className={
                    hideMenu
                      ? `navigation-menu_li_a`
                      : `navigation-menu.expanded_li_a`
                  }
                >
                  Register
                </Link>
              ) : (
                <Link to="/userProfile">
                  <span>{user.name}</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
