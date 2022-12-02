import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
        <Outlet>{props.children}</Outlet>
    </Fragment>
  );
};

export default Layout;