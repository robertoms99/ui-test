const PAGES_ROUTES = [
  {
    id: 1,
    label: 'Past Trials',
    path: '#'
  },
  {
    id: 2,
    label: 'How It Works',
    path: '#'
  },
  {
    id: 3,
    label: 'Login / Sign Up',
    path: '#'
  }
]

const NavbarHamburgerIcon = () => (
  <button className="nav__hamburger icon-button">
    <svg width="25" height="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h25v4H0V0zm0 8h25v4H0V8zm0 8h25v4H0v-4z" fill="#FFF" fillRule="nonzero" />
    </svg>
  </button>
)

const NavbarSearchForm = () => (
  <form action="javascript:void(0)">
    <input className="nav__search-input" aria-label="search" type="text" />
    <button className="nav__search icon-button" title="Search" type="submit">
      <img src="assets/img/search.svg" alt="search" />
    </button>
  </form>
)

const NavbarItem: React.FC<any> = ({ page }: any) => (
  <li>
    <a href={page.link}>{page.label}</a>
  </li>
)

const NavBar = () => {
  return (
    <nav className="nav" role="navigation">
      <div className="max-centered">
        <h1 className="nav__logo">Rule of thumb.</h1>
        <NavbarHamburgerIcon />
        <ul className="nav__links">
          {PAGES_ROUTES.map((page) => (
            <NavbarItem key={page.id} page={page} />
          ))}
          <li>
            <NavbarSearchForm />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
