import NavLinks from "./NavLinks";

function WebMenu() {
    return (
        <nav className="text-white font-body gap-4 p-4 hidden sm:flex print:hidden">
            <NavLinks />
        </nav>
    )
}

export default WebMenu;