import { Outlet } from 'react-router-dom'
import Menus from '../../components/Menus'

function UserPages() {

    return (
        <>
            <div className="page">
                <div className="page-head">
                    <Menus />
                </div>
                <div className="page-body">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default UserPages
