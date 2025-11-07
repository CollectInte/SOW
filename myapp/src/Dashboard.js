import React, { useState, useEffect,useRef } from "react";
import "./Dashboard.css";
import Products from "./Products";
import ProductsDisplay from "./ProductsDisplay";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Eng from "./images/GB.png";
import SE from "./images/SE.png";

const languages = [
  { code: "en", label: "English", flag: Eng }, // Replace Eng with your image import
  { code: "sv", label: "Swedish", flag: SE },  // Replace SE with your image import
];

const Dashboard = () => {
  const [Languages, setLanguages] = useState([]);
    const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const fetchLanguages = async () => {
    const request = await fetch("http://localhost:8000/languages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    console.log(response);
    setLanguages(response);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
    fetchLanguages();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="navbar">
            <div className="menunav">
              <MenuIcon style={{ color: "white" }} />
            </div>
            <div className="usernav">
              <div>
                <AccountCircleIcon
                  style={{ color: "white", fontSize: "45px" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    color: "white",
                    fontSize: "18px",
                    marginTop: "5px",
                  }}
                >
                  John Andre
                  <span
                    style={{
                      fontFamily: "sans-serif",
                      color: "white",
                      fontSize: "7px",
                      display: "block",
                    }}
                  >
                    Stanford US
                  </span>
                </p>
              </div>
            </div>

            <div className="language">
              <div className="dropdown" ref={ref}>
                <button className="dropdown-btn" onClick={() => setOpen(!open)}>
                  <img
                    src={selectedLang.flag}
                    alt={selectedLang.label}
                    className="flag-icon"
                  />
                  {selectedLang.label} 
                  <ArrowDropDownIcon/>
                </button>
                {open && (
                  <div className="dropdown-content">
                    {languages.map((lang) => (
                      <div
                        key={lang.code}
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedLang(lang);
                          setOpen(false);
                        }}
                      >
                        <img
                          src={lang.flag}
                          alt={lang.label}
                          className="flag-icon"
                        />
                        {lang.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="productdisplay">
        <Products />
        <ProductsDisplay />
      </div>
    </>
  );
};

export default Dashboard;
