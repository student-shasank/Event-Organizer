import React, { useState, useEffect } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import MenuItems from './MenuItems';
import MobileMenu from './MobileMenu';
import SearchPopup from './SearchPopup';
import Sidebar from './Sidebar';
import navLogo from "../../../assets/images/resources/logo-1.png";
import logo2 from "../../../assets/images/resources/logo2.png";
import MenuItems2 from './MenuItems2';

const HeaderStyleTwo = (props) => {
    const { parentMenu, secondParentMenu, activeMenu } = props;
    const location = useLocation(); // Current page detect karne ke liye
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenu, setMobileMenu] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [isSidebar, setIsSidebar] = useState(false);

    // Check if user is on home page
    const isHomePage = location.pathname === '/home' || location.pathname === '/';
    
    // Logo decide karo
    const currentLogo = isHomePage ? logo2 : navLogo;

    const handleMobileMenu = () => {
        setMobileMenu(!isMobileMenu);
        if (!isMobileMenu) {
            document.body.classList.add("mobile-menu-visible");
        } else {
            document.body.classList.remove("mobile-menu-visible");
        }
    }

    const handlePopup = () => {
        setIsPopup(!isPopup);
    }

    const handleSidebar = () => {
        setIsSidebar(!isSidebar);
    }

    const handleScroll = () => {
        setIsVisible(window.scrollY > 100);
    };

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <React.Fragment>
            <header
                className={`main-header main-header-two transparent-header ${
                    isVisible ? "fixed-header" : ""
                }`}
            >
                <nav className="main-menu main-menu-two">
                    <div className="main-menu__wrapper">
                        <div className="container">
                            <div className="main-menu__wrapper-inner">
                                <div className="main-menu__left">
                                    <div className="main-menu__logo">
                                        <Link to="/">
                                            <img src={currentLogo} alt="Logo" style={{width:"180px",}}/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="main-menu__main-menu-box">
                                    <div className="mobile-nav__toggler" onClick={handleMobileMenu}>
                                        <i className="fa fa-bars" />
                                    </div>
                                    <ul className="main-menu__list  text-black" >
                                        <MenuItems2
                                            parentMenu={parentMenu}
                                            secondParentMenu={secondParentMenu}
                                            activeMenu={activeMenu}
                                        />
                                    </ul>
                                </div>
                                <div className="main-menu__right">
                                    <div className="main-menu__btn-box">
                                        <Link to="/#events" className="main-menu__btn thm-btn">
    Explore Events <span className="icon-arrow-right"></span>
</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className={`stricky-header stricked-menu main-menu ${isVisible ? "stricky-fixed" : ""}`}>
                    <div className="sticky-header__content" />
                    <nav className="main-menu main-menu-two">
                        <div className="main-menu__wrapper">
                            <div className="container">
                                <div className="main-menu__wrapper-inner">
                                    <div className="main-menu__left">
                                        <div className="main-menu__logo">
                                            <Link to="/">
                                                <img src={navLogo} alt="Logo" style={{width:"180px",}}/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="main-menu__main-menu-box">
                                        <div className="mobile-nav__toggler" onClick={handleMobileMenu}>
                                            <i className="fa fa-bars" />
                                        </div>
                                        <ul className="main-menu__list_2">
                                            <MenuItems
                                                parentMenu={parentMenu}
                                                secondParentMenu={secondParentMenu}
                                                activeMenu={activeMenu}
                                            />
                                        </ul>
                                    </div>
                                    <div className="main-menu__right">
                                        <div className="main-menu__btn-box">
                                           <Link to="/#events" className="main-menu__btn thm-btn">
    Explore Events <span className="icon-arrow-right"></span>
</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                
                <MobileMenu handleMobileMenu={handleMobileMenu} />
            </header>
            
            <SearchPopup isPopup={isPopup} handlePopup={handlePopup} />
            <Sidebar isSidebar={isSidebar} handleSidebar={handleSidebar} />
        </React.Fragment>
    );
}

export default HeaderStyleTwo;