import NavLinks from "./NavLinks";

function WebMenu() {
    return (
        <nav className="items-center text-white font-body gap-6 p-4 hidden sm:flex print:hidden">
            <NavLinks />
        </nav>
    )
}

export default WebMenu;