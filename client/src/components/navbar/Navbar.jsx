import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { getUser, getUserLoginState, USER_STATE } from "../../withAuth";
// import { getLogoutButton, NavButton } from "./navItems";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { getLogoutButton, NavButton } from "./navItems";
const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();
  const userLoginState = getUserLoginState(user);
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="flex pl-4 pb-3 pt-3 pr-4 items-center justify-between xs:py-8 xs:px-8 bg-blue-green-0">
      <div className="flex justify-start items-center flex-1">
        <Link className="mr-8" to="/about">
          <img className="w-12 h-12" src="https://ik.imagekit.io/amey/ihub_aGeZsxN8aS.png?updatedAt=1683179788691" alt="logo" />
        </Link>
        <div className="text-2xl text-white">
          Annotation Tool
        </div>
      </div>
      {userLoginState !== USER_STATE.ANY ? (
        <div className="flex justify-end items-center lg:hidden xs:hidden">
          <Link
            className="text-white mx-2 my-1 cursor-pointer whitespace-nowrap"
            to="/my-data"
          >
            Dashboard
          </Link>
          <div
            className="text-white mx-4 my-1 whitespace-nowrap"
          >
            Hi {user.user.first_name}
          </div>
          {getLogoutButton(navigate)}
        </div>
      ) : (
        <div className="flex justify-end items-center lg:hidden xs:hidden">
          <p className="text-white font-medium text-base capitalize mx-4 my-1 cursor-pointer">
            <Link to="/sign-in"> Sign In </Link>
          </p>
          <NavButton>
            <Link className="" to="/sign-up" style={{ color: "white" }}>
              Sign Up
            </Link>
          </NavButton>
        </div>
      )}
      <div className="ml-3 my-3 hidden cursor-pointer relative lg:flex">
        {!toggleMenu ? (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        ) : (
          <>
            <RiCloseLine
              color="#fff"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
            <div className="absolute top-10  bg-blue-green-1 right-0 shadow rounded whitespace-nowrap pt-3">
              <div className="flex flex-col gap-2 ml-4 mr-12">
                {/* {NAV_CONFIG.map((navItemConfig) =>
                  navItemRenderer(navItemConfig, pathname, userLoginState, true)
                )} */}
                <div className="text-left mt-3">
                  {userLoginState !== USER_STATE.ANY ? (
                    <div>
                      <Link
                        className="text-white mx-2 my-1 cursor-pointer whitespace-nowrap"
                        to="/my-data"
                      >
                        Dashboard
                      </Link>
                      <div
                        className="text-white mx-2 my-1 whitespace-nowrap"
                      >
                        Hi {user.user.first_name}
                      </div>
                      <div className="-mr-4 mx-2 mb-4 whitespace-nowrap">
                        {getLogoutButton(navigate)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-left mb-4">
                      <p className="text-white my-1 cursor-pointer mb-2">
                        <Link to="/sign-in"> Sign In </Link>
                      </p>
                      <Link className="-mr-4 whitespace-nowrap" to="/sign-up">
                        <NavButton> Sign Up </NavButton>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
