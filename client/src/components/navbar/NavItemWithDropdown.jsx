import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

export const NavItemWithDropdown = ({ navItemConfig, pathname, isDropDown }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isActive = navItemConfig.options.some(navItemOption => navItemOption.pathname === pathname);

  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  return (
    <button
      className={isActive ? "text-blue-500 focus:outline-0" : "text-white focus:outline-0"}
      onClick={() => {
        setShowDropdown((a) => !a);
      }}
    >
      <span className="flex items-center hover:underline">
        <span>{navItemConfig.name}</span> <BiChevronDown />
      </span>
      {showDropdown ? (
        <div className={`bg-blue-green-1 pl-3 flex flex-col gap-2 pb-3 mt-2 pt-2 ${isDropDown ? '' : 'absolute top-14 pr-4'}`}>
          {navItemConfig.options.map((navItemOptionConfig) => (
            <Link
              className={
                pathname === navItemOptionConfig.pathname
                  ? "text-blue-500 text-left"
                  : "text-white text-left"
              }
              to={navItemOptionConfig.pathname}
            >
              {navItemOptionConfig.name}
            </Link>
          ))}
        </div>
      ) : null}
    </button>
  );
};
