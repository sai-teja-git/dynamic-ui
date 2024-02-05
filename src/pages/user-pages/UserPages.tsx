import { Outlet } from 'react-router-dom'
import Menus from '../../components/Menus'
import Header from '../../components/Header'

function UserPages() {

    return (
        <>
            <Header />
            {/* <div className="side-menu">
                    <Menus />
                </div> */}
            <div className="page">
                <Outlet />
            </div>
        </>
    )
}

export default UserPages
