"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useClickOutside from "./useClickOutside";

const initialMenuItems = [
  { icon: "/icons/home.svg", label: "Home" },
  { icon: "/icons/shorts.svg", label: "Shorts" },
  { icon: "/icons/subscriptions.svg", label: "Subscriptions" },
  { icon: "/icons/user.svg", label: "You" },
];

const allMenuItems = [
  ...initialMenuItems,
  { icon: "/icons/home.svg", label: "Home" },
  { icon: "/icons/shorts.svg", label: "Shorts" },
  { icon: "/icons/subscriptions.svg", label: "Subscriptions" },
  { icon: "/icons/user.svg", label: "You" },
  { icon: "/icons/home.svg", label: "Home" },
  { icon: "/icons/shorts.svg", label: "Shorts" },
  { icon: "/icons/subscriptions.svg", label: "Subscriptions" },
  { icon: "/icons/user.svg", label: "You" },
];

const extraItems = [
  { icon: "/icons/setting.svg", label: "Settings" },
  { icon: "/icons/report.svg", label: "Report Problem" },
  { icon: "/icons/help.svg", label: "Help" },
  { icon: "/icons/feedback.svg", label: "Send Feedback" },
];

const Navbar = ({
  setSearchQuery,
  onSidebarToggle,
  initialSidebarExpanded = true,
  alwaysShowSidebar = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(initialSidebarExpanded);
  const { theme, setTheme } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useClickOutside(() => setIsUserMenuOpen(false));

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  const handleReset = () => {
    setInputValue("");
    setSearchQuery("");
  };

  const handleMenu = () => {
    if (alwaysShowSidebar) {
      // For homepage: Toggle between collapsed and expanded states for lg screens and above
      const newExpandedState = !isSidebarExpanded;
      setIsSidebarExpanded(newExpandedState);
      // Notify parent of the expanded state (homepage always has sidebar visible)
      onSidebarToggle(true, newExpandedState);
    }
    // For video playback page: No toggle logic needed, Sheet will handle the sidebar
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      {/* Sheet Sidebar for all screens on video playback page, and md screens on homepage */}
      <Sheet>
        <div
          className={`fixed w-full h-[46px] items-center z-50 transition-all duration-300 ${
            theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
          }`}
        >
          <nav className="flex items-center h-[40px] lg:h-[56px] justify-between pt-1 px-3">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {/* Show SheetTrigger for all screens on video playback page, and md screens on homepage */}
                <SheetTrigger
                  className={`p-2 rounded-full ${
                    alwaysShowSidebar ? "lg:hidden" : ""
                  } ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"
                  }`}
                >
                  <Image
                    src="/icons/menu.svg"
                    width={24}
                    height={24}
                    alt="Menu"
                    className={`w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] cursor-pointer ${
                      theme === "dark" ? "invert" : ""
                    }`}
                  />
                </SheetTrigger>
                {/* Show toggle button for screens lg and above on homepage */}
                {alwaysShowSidebar && (
                  <button
                    onClick={handleMenu}
                    className={`p-2 rounded-full hidden lg:block ${
                      theme === "dark" ? "hover:bg-[#242424]" : "hover:bg-gray-200"
                    }`}
                  >
                    <Image
                      src="/icons/menu.svg"
                      width={24}
                      height={24}
                      alt="Menu"
                      className={`w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] cursor-pointer ${
                        theme === "dark" ? "invert" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              <div className="flex cursor-pointer items-center">
                <Image
                  src="/icons/youtube.svg"
                  width={40}
                  height={40}
                  alt="YouTube"
                  className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]"
                />
                <h1
                  className={`text-[15px] lg:text-[20px] tracking-[-1.2px] ml-0.5 font-[700] ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  YouTube
                </h1>
                <p
                  className={`text-[8px] opacity-60 mb-4 ml-1 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  IN
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 xl:flex-1">
              <div className="flex items-center flex-grow xl:justify-center">
                <form
                  onSubmit={handleSearch}
                  className={`flex relative w-[325px] lg:w-[460px] xl:w-[600px] h-[32px] lg:h-[40px] items-center border-[1px] rounded-full shadow-2xl ${
                    theme === "dark" ? "border-[#313131]" : "border-gray-300"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                    className={`w-[274px] h-[30px] lg:w-[396px] xl:w-[536px] lg:h-[38px] indent-4 rounded-l-full text-[0.8rem] lg:text-[16px] ${
                      theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
                    }`}
                  />
                  {inputValue && (
                    <button type="button" onClick={handleReset}>
                      <Image
                        src="/icons/reset.svg"
                        width={18}
                        height={18}
                        alt="Reset"
                        className={`lg:w-[24px] lg:h-[24px] absolute top-1.5 right-14 lg:right-18 ${
                          theme === "dark" ? "invert" : ""
                        }`}
                      />
                    </button>
                  )}
                  <button
                    type="submit"
                    className={`border-[1px] rounded-r-full ml-0 w-[50px] lg:w-[65px] h-[32px] lg:h-[40px] flex items-center justify-center cursor-pointer ${
                      theme === "dark"
                        ? "bg-[#242424] border-[#313131]"
                        : "bg-gray-100 hover:bg-gray-300 border-gray-300"
                    }`}
                  >
                    <Image
                      src="/icons/search.svg"
                      width={19}
                      height={19}
                      alt="Search"
                      className={`w-[19px] h-[19px] lg:w-[24px] lg:h-[24px] ${
                        theme === "dark" ? "invert" : ""
                      }`}
                    />
                  </button>
                </form>
                <button
                  className={`flex items-center p-2 lg:p-2.5 ml-2 lg:ml-3 rounded-full cursor-pointer ${
                    theme === "dark"
                      ? "bg-[#242424] hover:bg-[#313131]"
                      : "bg-gray-100 hover:bg-gray-300"
                  }`}
                >
                  <Image
                    src="/icons/mic.svg"
                    width={22}
                    height={22}
                    alt="Mic"
                    className={`w-[19px] h-[19px] lg:w-[24px] lg:h-[24px] ${
                      theme === "dark" ? "invert" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-1 lg:space-x-3">
                <button
                  className={`flex items-center w-[82px] h-[32px] lg:w-[99px] lg:h-[40px] rounded-[40px] cursor-pointer ${
                    theme === "dark"
                      ? "bg-[#242424] text-white hover:bg-[#313131]"
                      : "bg-gray-100 text-black hover:bg-gray-300"
                  }`}
                >
                  <Image
                    src="/icons/create.svg"
                    width={19}
                    height={19}
                    alt="Create"
                    className={`w-[19px] h-[19px] lg:w-[24px] lg:h-[24px] mx-2 ${
                      theme === "dark" ? "invert" : ""
                    }`}
                  />
                  <span className="text-[12px] lg:text-[14px] font-[500]">
                    Create
                  </span>
                </button>
                <button
                  className={`rounded-full p-2 cursor-pointer ${
                    theme === "dark"
                      ? "text-white hover:bg-[#313131]"
                      : "text-black hover:bg-gray-300"
                  }`}
                >
                  <Image
                    src="/icons/notification.svg"
                    width={19}
                    height={19}
                    alt="Notification"
                    className={`lg:w-[24px] lg:h-[24px] ${
                      theme === "dark" ? "invert" : ""
                    }`}
                  />
                </button>
                {/* User Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className={`p-2 rounded-full cursor-pointer ${
                      theme === "dark" ? "hover:bg-[#313131]" : "hover:bg-gray-200"
                    }`}
                  >
                    <Image
                      src="/icons/user.svg"
                      width={24}
                      height={24}
                      alt="User"
                      className={`w-[19px] h-[19px] lg:w-[28px] lg:h-[28px] cursor-pointer ${
                        theme === "dark" ? "invert" : ""
                      }`}
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div
                      className={`absolute right-12 top-0 w-[300px] h-[140px] rounded-lg shadow-lg z-50 overflow-y-auto max-h-[80vh] ${
                        theme === "dark"
                          ? "bg-[#242424] text-white border-black"
                          : "bg-white text-black border-gray-200"
                      } border`}
                    >
                      <div className="flex items-center justify-center p-4 border-b-[1px] border-gray-200 dark:border-[#313131]">
                        <Image
                          src="/icons/user.svg"
                          width={24}
                          height={24}
                          alt="User"
                          className={`w-[24px] h-[24px] mr-3 ${
                            theme === "dark" ? "invert" : ""
                          }`}
                        />
                      </div>
                      <div
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className={`flex items-start py-3 gap-5 justify-center mt-4 cursor-pointer ${
                          theme === "dark"
                            ? "border-black hover:bg-[#313131]"
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        <Image
                          src="/icons/mode.svg"
                          width={24}
                          height={24}
                          alt="Mode"
                          className={`${theme === "dark" ? "invert" : ""}`}
                        />
                        <p className="text-md">
                          Appearance: {theme === "dark" ? "Light" : "Dark"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Sheet Sidebar Content */}
        <SheetContent
          side="left"
          className={`w-[190px] lg:w-[200px] xl:w-[225px] pr-4 py-4 pl-2 h-screen overflow-y-auto scrollbar-hide ${
            theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
          } ${alwaysShowSidebar ? "lg:hidden" : ""}`}
        >
          <nav className="flex flex-col pt-1">
            <div className="flex items-center space-x-4 mt-[-15px] lg:mt-[-11px] pb-3">
              <SheetTrigger
                className={`py-2 pl-3 rounded-full ${
                  theme === "dark" ? "hover:bg-[#313131]" : "hover:bg-gray-200"
                }`}
              >
                <Image
                  src="/icons/menu.svg"
                  width={24}
                  height={24}
                  alt="Menu"
                  className={`w-[20px] h-[20px] cursor-pointer ${
                    theme === "dark" ? "invert" : ""
                  }`}
                />
              </SheetTrigger>
              <div className="flex items-center cursor-pointer">
                <Image
                  src="/icons/youtube.svg"
                  width={36}
                  height={36}
                  alt="YouTube"
                  className="w-[25px] h-[25px]"
                />
                <h1
                  className={`text-[16px] tracking-[-1.2px] ml-0.5 font-[700] ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  YouTube
                </h1>
                <p className="text-[10px] mb-2">IN</p>
              </div>
            </div>
            {allMenuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 py-[6px] px-2 rounded-lg cursor-pointer 
                ${theme === "dark" ? "hover:bg-[#313131]" : "hover:bg-gray-200"} 
                ${
                  index === 0
                    ? theme === "dark"
                      ? "bg-[#313131]"
                      : "bg-gray-200"
                    : "bg-transparent"
                }
                `}
              >
                <Image
                  src={item.icon}
                  width={20}
                  height={20}
                  alt={item.label}
                  className={theme === "dark" ? "invert" : ""}
                />
                <p className="text-[12px]">{item.label}</p>
              </div>
            ))}
            <hr className="my-4 opacity-70" />
            {extraItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer ${
                  theme === "dark" ? "hover:bg-[#313131]" : "hover:bg-gray-200"
                }`}
              >
                <Image
                  src={item.icon}
                  width={20}
                  height={20}
                  alt={item.label}
                  className={theme === "dark" ? "invert" : ""}
                />
                <p className="text-[12px]">{item.label}</p>
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Fixed Sidebar for screens lg and above (only on homepage) */}
      {alwaysShowSidebar && (
        <div
          className={`block fixed h-screen transition-all duration-300 mt-8 xl:pt-5 ${
            isSidebarExpanded ? "lg:w-[230px] xl:w-[225px]" : "lg:w-[70px] md:ml-1 lg:ml-0"
          } ${
            theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex flex-col h-full lg:mt-4 xl:mt-0 overflow-y-auto scrollbar-hide">
            {isSidebarExpanded ? (
              // Expanded sidebar (only for lg and above)
              <div
                className={`p-4 pb-8 xl:ml-2 xl:w-[300px] ${
                  theme === "dark" ? "bg-[#0f0f0f]" : "bg-white"
                }`}
              >
                {allMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-5 p-2 my-1 rounded-lg w-[190px] mr-5 cursor-pointer 
                    ${theme === "dark" ? "hover:bg-[#313131]" : "hover:bg-gray-200"} 
                    ${
                      index === 0
                        ? theme === "dark"
                          ? "bg-[#313131]"
                          : "bg-gray-200"
                        : "bg-transparent"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      width={20}
                      height={20}
                      alt={item.label}
                      className={`lg:w-[22px] lg:h-[22px] ${
                        theme === "dark" ? "invert" : ""
                      }`}
                    />
                    <p className="text-[14px]">{item.label}</p>
                  </div>
                ))}
                <hr className="my-4 opacity-70" />
                {extraItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-2 rounded-lg w-[170px] cursor-pointer ${
                      theme === "dark" ? "hover:bg-[#313131]" : "hover:bg-gray-200"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      width={20}
                      height={20}
                      alt={item.label}
                      className={theme === "dark" ? "invert" : ""}
                    />
                    <p className="text-[16px]">{item.label}</p>
                  </div>
                ))}
              </div>
            ) : (
              // Collapsed sidebar (for lg and above)
              <div className="flex flex-col space-y-3 xl:space-y-4 mt-5 lg:mt-4 xl:mt-4">
                {initialMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center gap-1 rounded-lg py-2 cursor-pointer ${
                      theme === "dark" ? "hover:bg-[#313131]" : "hover:bg-gray-200"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      width={20}
                      height={20}
                      alt={item.label}
                      className={`lg:w-[23px] lg:h-[23px] ${
                        theme === "dark" ? "invert" : ""
                      }`}
                    />
                    <p className="text-[8px] lg:text-[10px] font-[400]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;