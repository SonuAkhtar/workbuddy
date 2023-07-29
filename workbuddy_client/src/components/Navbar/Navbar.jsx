import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import createRequest from "../../utils/createRequest";
import "./navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moveDots, setMoveDots] = useState(false);
  const [menuClick, setMenuClick] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const handleLogout = async () => {
    try {
      await createRequest.post("auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavClick = (path) => {
    setMenuClick(false);
    navigate(path);
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <main>
        <div className={`logo ${menuClick && "show"}`}>
          <span onClick={() => handleNavClick("/")} className="link">
            work
            <span className={`dot dot1 ${moveDots ? "loaded" : ""}`}></span>
            <span className={`dot dot2 ${moveDots ? "loaded" : ""}`}></span>
            <span className="buddy">buddy</span>
          </span>
        </div>
        <div className={`links ${menuClick && "show"}`}>
          <span
            onClick={() => handleNavClick("/")}
            className={`link ${pathname === "/business" && "active"}`}
          >
            Business
          </span>
          <span
            onClick={() => handleNavClick("/")}
            className={`link ${pathname === "/categories" && "active"}`}
          >
            Categories
          </span>
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
                src={currentUser.img || "/images/noavatar.jpg"}
                alt="user-image"
              />
              <span>{currentUser?.username}</span>
              <i
                class="fa-solid fa-angle-down"
                onClick={() => setMenuOpen(!menuOpen)}
              ></i>
              <div className={`options ${menuOpen ? "open" : ""}`}>
                {currentUser?.isSeller && (
                  <>
                    <Link
                      className="link"
                      to="/myservices"
                      onClick={() => setMenuOpen(false)}
                    >
                      Services
                    </Link>
                    <Link
                      className="link"
                      to="/add"
                      onClick={() => setMenuOpen(false)}
                    >
                      Add New Service
                    </Link>
                  </>
                )}
                <Link
                  className="link"
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  className="link"
                  to="/messages"
                  onClick={() => setMenuOpen(false)}
                >
                  Messages
                </Link>
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
          className={`mobile_menu ${menuClick && "show"}`}
          onClick={() => setMenuClick(!menuClick)}
        >
          <span className={`burger ${menuClick ? "" : "active"}`}>
            <i className="fa-solid fa-bars"></i>
          </span>
          <div className={`close ${menuClick ? "active" : ""}`}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </main>
      {(active || pathname !== "/") && (
        <>
          {pathname !== "/login" && pathname !== "/register" && <hr />}
          <div
            className={`menu ${menuClick ? "active" : ""} ${
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
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
