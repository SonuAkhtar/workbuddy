import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import createRequest from "../../utils/createRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import "./navbar.scss";

const Navbar = () => {
  const [moveDots, setMoveDots] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    setTimeout(() => {
      setMoveDots(true);
    }, 1000);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const isActive = () => {
    window.scrollY > 0 ? setNavActive(true) : setNavActive(false);
  };

  const handleLogout = async () => {
    setShowUserMenu(false);

    try {
      await createRequest.post("auth/logout");

      localStorage.removeItem("currentUser");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavClick = (path) => {
    setBurgerMenu(false);
    navigate(path);
  };

  const handleUserMenuClick = (path) => {
    setBurgerMenu(false);
    setShowUserMenu(false);
    navigate(path);
  };

  const handleBurgerIconClick = () => {
    setBurgerMenu(!burgerMenu);
    setNavActive(!navActive);
  };

  return (
    <div className={navActive || pathname !== "/" ? "navbar active" : "navbar"}>
      <main>
        <div className={`logo ${burgerMenu && "show"}`}>
          <span onClick={() => handleNavClick("/")} className="link">
            work
            <span className={`dot dot1 ${moveDots ? "loaded" : ""}`}></span>
            <span className={`dot dot2 ${moveDots ? "loaded" : ""}`}></span>
            <span className="buddy">buddy</span>
          </span>
        </div>
        <div className={`links ${burgerMenu && "show"}`}>
          <a
            href="#category"
            onClick={() => setBurgerMenu(false)}
            className={`link ${pathname === "/categories" && "active"}`}
          >
            Categories
          </a>
          <a
            href="#popular"
            onClick={() => setBurgerMenu(false)}
            className={`link ${pathname === "/categories" && "active"}`}
          >
            Experts
          </a>
          <a
            href="#business"
            onClick={() => setBurgerMenu(false)}
            className={`link ${pathname === "/business" && "active"}`}
          >
            Business
          </a>

          {!currentUser?.isSeller && (
            <span
              onClick={() => handleNavClick("/")}
              className={`link ${pathname === "/creator" && "active"}`}
            >
              Become a Creator
            </span>
          )}
          {currentUser ? (
            <div className="user">
              <img
                src={currentUser?.img || "/images/noavatar.jpg"}
                alt="user-image"
              />
              <span>{currentUser?.username}</span>
              <i
                className="fa-solid fa-angle-down"
                onClick={() => setShowUserMenu(!showUserMenu)}
              ></i>
              <div className={`options ${showUserMenu ? "open" : ""}`}>
                {currentUser?.isSeller && (
                  <>
                    <span
                      className="link"
                      onClick={() => handleUserMenuClick("/myservices")}
                    >
                      My Services
                    </span>
                    <span
                      className="link"
                      onClick={() => handleUserMenuClick("/serviceAdd")}
                    >
                      Add A Service
                    </span>
                  </>
                )}
                <span
                  className="link"
                  onClick={() => handleUserMenuClick("/orders")}
                >
                  Orders
                </span>
                <span
                  className="link"
                  onClick={() => handleUserMenuClick("/messages")}
                >
                  Messages
                </span>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <>
              <span
                onClick={() => handleNavClick("/login")}
                className={`link ${pathname === "/login" && "active"}`}
              >
                Sign in
              </span>
              <button
                onClick={() => handleNavClick("/register")}
                className={`${pathname === "/register" && "active"}`}
              >
                Register
              </button>
            </>
          )}
        </div>

        <div
          className={`mobile_menu ${burgerMenu && "show"}`}
          onClick={handleBurgerIconClick}
        >
          <span className={`burger ${burgerMenu ? "" : "active"}`}>
            <i className="fa-solid fa-bars"></i>
          </span>
          <div className={`close ${burgerMenu ? "active" : ""}`}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </main>
      {(navActive || pathname !== "/") && (
        <>
          {pathname !== "/login" && pathname !== "/register" && <hr />}
          <div
            className={`bottomMenu ${burgerMenu ? "active" : ""} ${
              pathname === "/login" || pathname === "/register" ? "hide" : ""
            }`}
          >
            <Link className="link" to="/">
              Mobile App
            </Link>
            <Link className="link" to="/">
              Website Development
            </Link>
            <Link className="link" to="/">
              Graphic Design
            </Link>
            <Link className="link" to="/">
              Video
            </Link>
            <Link className="link" to="/">
              Animation
            </Link>
            <Link className="link" to="/">
              AI Work
            </Link>
            <Link className="link" to="/">
              Digital Marketing
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
