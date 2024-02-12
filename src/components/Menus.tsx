import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Menus() {

    const navigate = useNavigate();
    const location = useLocation();

    const [current_path, setCurrentPath] = useState("");

    const menu_list = [
        {
            name: "Form Builder",
            path: "/pages/form-constructor",
            key: "form_builder",
            icon: "fa-solid fa-file-pen"
        },
        {
            name: "Form View",
            path: "/pages/form-view",
            key: "form_view",
            icon: "fa-solid fa-folder-tree"
        },
        {
            name: "DND Test",
            path: "/pages/dnd-test",
            key: "dnd_test",
            icon: "fa-solid fa-clone"
        },
    ]


    useEffect(() => {
    }, [])

    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [location])

    /**
     * The function redirects to a specified menu path and updates the current path.
     * @param {any} menu - The `menu` parameter is an object that represents a menu item. It likely has
     * properties such as `path`, which represents the URL path to navigate to when the menu item is
     * clicked.
     */
    function redirectTo(menu: any) {
        setCurrentPath(menu.path)
        navigate(menu.path)
    }

    return (
        <>
            <div className="menu-list">
                <ul className="menu-content">
                    {menu_list.map((menu) => (
                        <li className={`${(current_path === menu.path && 'active')}`} onClick={() => redirectTo(menu)} key={menu.path}>
                            <a>
                                <div className="menu-icon">
                                    <i className={menu.icon}></i>
                                </div>
                                <div className="menu-name">
                                    {menu.name}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
