import { useNavbarOffset } from "../../hooks/useNavbarOffset"

function NavbarPlaceholder() {
  const navbarHeight = useNavbarOffset()

  return <div style={{ height: navbarHeight }}></div>
}

export default NavbarPlaceholder
