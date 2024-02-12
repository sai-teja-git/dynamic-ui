import { Outlet } from 'react-router-dom'
import Menus from '../../components/Menus'
import Header from '../../components/Header'

function UserPages() {

    return (
        <>
            <div className="page-wrapper">
                <Menus />
                <Header />
                <div className="page">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default UserPages
