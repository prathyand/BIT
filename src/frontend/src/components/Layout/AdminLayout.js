import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import AdminMainNavigation from './AdminMainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <AdminMainNavigation />
        <Outlet>{props.children}</Outlet>
    </Fragment>
  );
};

export default Layout;