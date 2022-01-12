import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import { logoutAction } from "../../store/reducer";
import Cookies from 'js-cookie';

function Header(props) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownNotificationOpen, setDropdownNotificationOpen] = React.useState(false);
  const [dropdownOptionsOpen, setDropdownOptionsOpen] = React.useState(false);
  const [color, setColor] = React.useState('transparent');
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const toggle = () => {
    if (isOpen) {
      setColor('transparent');
    } else {
      setColor('dark');
    }
    setIsOpen(!isOpen);
  };
  const dropdownNotificationToggle = (e) => {
    setDropdownNotificationOpen(!dropdownNotificationOpen);
  };
  const dropdownOptionsToggle = (e) => {
    setDropdownOptionsOpen(!dropdownOptionsOpen);
  };
  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
    Cookies.remove("session");
    dispatch(push("/"));
    //push(!dropdownOptionsOpen);
  };
  const getBrand = () => {
    let brandName = 'Default Brand';
    props.routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    sidebarToggle.current.classList.toggle('toggled');
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor('dark');
    } else {
      setColor('transparent');
    }
  };
  React.useEffect(() => {
    window.addEventListener('resize', updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993
      && document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
      sidebarToggle.current.classList.toggle('toggled');
    }
  }, [location]);
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        props.location.pathname.indexOf('full-screen-maps') !== -1
          ? 'dark'
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf('full-screen-maps') !== -1
          ? 'navbar-absolute fixed-top'
          : `navbar-absolute fixed-top ${
            color === 'transparent' ? 'navbar-transparent ' : ''}`
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
            <NavItem>
              <Link to="#pablo" className="nav-link btn-magnify">
                <i className="nc-icon nc-layout-11" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </Link>
            </NavItem>
            <Dropdown
              nav
              isOpen={dropdownNotificationOpen}
              toggle={(e) => dropdownNotificationToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-bell-55" />
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a">Action</DropdownItem>
                <DropdownItem tag="a">Another Action</DropdownItem>
                <DropdownItem tag="a">Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              nav
              isOpen={dropdownOptionsOpen}
              toggle={(e) => dropdownOptionsToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-settings-gear-65" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={logout} tag="a">Cerrar sesión</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
