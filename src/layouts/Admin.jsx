import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin';
import DemoNavbar from '../components/Navbars/DemoNavbar';

let ps;

function Dashboard(props) {
  const user = useSelector((state) => state.login.usuario.user);
  const [backgroundColor, setBackgroundColor] = React.useState('black');
  const [activeColor, setActiveColor] = React.useState('info');
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
        document.body.classList.toggle('perfect-scrollbar-on');
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={props.routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <div className="content">
          <Switch>
            {props.routes.map((prop, key) => {
              let validateRol = false;
              prop.rol.forEach((rol) => {
                if (rol === user?.rol) {
                  validateRol = true;
                }
              });
              if (validateRol) {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              }
            })}
          </Switch>
        </div>
        <Footer fluid />
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      />
    </div>
  );
}

export default Dashboard;