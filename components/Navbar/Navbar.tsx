"use client";
import React, { useState } from "react";
import NavLink from "@/components/Navbar/NavLink";
import SearchBar from "@/components/Navbar/SearchBar";
import ThemeToggle from "@/components/Navbar/ThemeToggle"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedNavLink, setSelectedNavLink] = useState("News");
  const [results, setResults] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-5">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap">
            Sentiment News
          </span>
        </a>
       
        <div className="flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden rounded-lg text-lg p-2.5 me-1"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
          
          <div className="relative hidden md:block">
          
            <SearchBar setResults={setResults} />
          </div>
          
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-lg rounded-lg md:hidden focus:outline-none focus:ring-2"
            aria-controls="navbar-search"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <ThemeToggle />
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <SearchBar setResults={setResults} />
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <NavLink
              name={"News"}
              href={"#"}
              isSelected={selectedNavLink === "News"}
              setSelectedNavLink={setSelectedNavLink}
            />
            <NavLink
              name={"Stocks"}
              href={"#"}
              isSelected={selectedNavLink === "Stocks"}
              setSelectedNavLink={setSelectedNavLink}
            />
            <NavLink
              name={"About"}
              href={"#"}
              isSelected={selectedNavLink === "About"}
              setSelectedNavLink={setSelectedNavLink}
            />
          </ul>
          
        </div>
        
    </nav>
  );
};

export default Navbar;
