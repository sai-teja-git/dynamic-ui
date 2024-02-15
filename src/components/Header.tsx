import { useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [page_theme, setPageTheme] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        updateTheme();
        try {
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', () => {
                updateTheme()
            })
        } catch { }
    }, [])

    /**
     * The function `selectTheme` updates the selected theme and stores it in the session storage.
     * @param {string} selected - The `selected` parameter is a string that represents the theme that
     * the user has selected.
     */
    function selectTheme(selected: string) {
        updateTheme(selected)
        sessionStorage.setItem("app_theme", selected)
    }

    /**
     * The function updates the theme of the application based on the user's preference or the system's
     * preferred color scheme.
     * @param theme - The `theme` parameter is a string that represents the current theme of the
     * application. It can have three possible values: "dark", "light", or "system".
     */
    function updateTheme(theme = sessionStorage.getItem("app_theme")) {
        if (!theme) {
            theme = "dark";
            sessionStorage.setItem("app_theme", "dark");
        }
        setPageTheme(theme)
        if (theme === "system") {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                theme = "dark"
            } else {
                theme = "light"
            }
        }
        if (theme === "dark") {
            document.body.setAttribute("app-data-theme", "dark");
            document.body.setAttribute("data-bs-theme", "dark");
        } else {
            document.body.setAttribute("app-data-theme", "light");
            document.body.setAttribute("data-bs-theme", "light");
        }
    }

    /**
     * The function toggles the "menu-open" class on the ".page-wrapper" element.
     */
    function toggleMenu() {
        if ($(".page-wrapper").hasClass("menu-open")) {
            $(".page-wrapper").removeClass("menu-open")
        } else {
            $(".page-wrapper").addClass("menu-open")
        }
    }

    function logout() {
        navigate("/login")
    }

    return (
        <>
            <div className="page-header">
                <div className="head-left">
                    <div className="logo">
                        <img src="/src/assets/svg/vite.svg" alt="logo" />
                    </div>
                    <div className="title">
                        Dynamic UI
                    </div>
                    <div className="menu">
                        <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
                    </div>
                </div>
                <div className="head-right">
                    <div className="head-option">
                        <div className="user-profile">
                            <img src="/src/assets/images/profile/default-profile-image.png" alt="" data-bs-toggle="offcanvas" data-bs-target="#profileDetails" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabIndex={-1} id="profileDetails" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <div className="title">
                        <div className="logout-option" onClick={logout}>
                            <i className="fa-solid fa-power-off"></i> Logout
                        </div>
                    </div>
                    <div className="options">
                        <div className="option-item close">
                            <i className="fa-solid fa-xmark" data-bs-dismiss="offcanvas"></i>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-body p-0">
                    <div className="profile-data">
                        <div className="profile-image">
                            <img src="/src/assets/images/profile/default-profile-image.png" alt="logo" />
                        </div>
                        <div className="profile-details">
                            <div className="full-name">
                                Full Name
                            </div>
                            <div className="user-name">user_name</div>
                        </div>
                        <div className="edit">
                            Edit
                        </div>
                    </div>
                    <div className="theme-action">
                        <div className="title">
                            Theme
                        </div>
                        <div className="theme-options">
                            <div className={`switch-theme light ${page_theme === "light" && "active"}`} onClick={() => selectTheme("light")}>
                                Light
                            </div>
                            <div className={`switch-theme dark ${page_theme === "dark" && "active"}`} onClick={() => selectTheme("dark")}>
                                <i className="fa-solid fa-cloud-moon"></i> Dark
                            </div>
                            <div className={`switch-theme system ${page_theme === "system" && "active"}`} onClick={() => selectTheme("system")}>
                                <i className="fa-solid fa-desktop"></i> System
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
