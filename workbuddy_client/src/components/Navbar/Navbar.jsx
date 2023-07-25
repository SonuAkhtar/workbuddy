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
        <div className="logo">
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
            <div className="user" onClick={() => setMenuOpen(!menuOpen)}>
              <img
                src={currentUser.img || "/images/noavatar.jpg"}
                alt="user-image"
              />
              <span>{currentUser?.username}</span>
              <div className={`options ${menuOpen ? "open" : ""}`}>
                {currentUser?.isSeller && (
                  <>
                    <Link className="link" to="/myGigs">
                      Gigs
                    </Link>
                    <Link className="link" to="/add">
                      Add New Gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
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

        <div className="mobile_menu" onClick={() => setMenuClick(!menuClick)}>
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
            className={`menu ${
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
