import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { logout } from "../../redux/apiAction";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },

  // {
  //   name: "Edit Post",
  //   href: "/editpost",
  // },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.api.userInfo);
  const token = useSelector((state) => state.api.token);

  const userLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-gray-50 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              NepTech
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="hidden space-x-2 lg:block">
              {userInfo !== null ? (
                <Dropdown>
                  <DropdownTrigger>
                    <div className="text-blue-400 border border-gray-100 px-3 py-1 rounded-md capitalize">
                      {userInfo}
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/addpost">Add Post</Link>
                    </DropdownItem>
                    <DropdownItem onClick={userLogout}>Log Out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm  text-100 :text-blue-500 hover:underline"
                >
                  Log In
                </button>
              )}
            </div>
            <div className="lg:hidden">
              <div onClick={toggleMenu} className="h-6 w-6 cursor-pointer">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M5 7h14M5 12h14M5 17h14"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        {token && (
          <div className="max-w-screen-xl hidden  px-4 py-3 mx-auto">
            <div className="flex items-center justify-center">
              <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-900 dark:text-white hover:underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="absolute inset-x-0 top-20 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-end">
                  <div className="-mr">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <div className="h-6 w-6" aria-hidden="true">
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="mt-2 space-y-2">
                  {userInfo !== null ? (
                    <Dropdown>
                      <DropdownTrigger>
                        <div>{userInfo}</div>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>
                          <Link to="/dashboard">Dashboard</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to="/addpost">Add Post</Link>
                        </DropdownItem>
                        <DropdownItem onClick={userLogout}>
                          Log Out
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      type="button"
                      className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Log In
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
