import React from "react";
import { Outlet } from "react-router-dom";

import DashboardWrapper from "../../hoc/dashboardWrapper/dashboardWrapper";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Outlet />
    </DashboardWrapper>
  );
};

export default Dashboard;
