
export default function Header() {
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
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>
                <div className="head-right">
                    <div className="head-option">
                        <div className="user-profile">
                            <img src="/src/assets/images/profile/default-profile-image.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
