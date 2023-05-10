import React from "react";

import Sidenav from "../../components/sidenav/Sidenav";

import classes from "./dashboardWrapper.module.scss";

type Props = {
  children: JSX.Element;
};

const STATIC_LINKS = [
  { title: "Bugs", link: "/bugs" },
  { title: "NewBug", link: "/bugs/new" },
  { title: "Bug", link: "/bugs/sdsd" },
  { title: "Profile", link: "/profile" },
];

const DashboardWrapper = ({ children }: Props) => {
  return (
    <section className={classes.wrapper}>
      <Sidenav links={STATIC_LINKS} />
      <main className={classes.main}>{children}</main>
    </section>
  );
};

export default DashboardWrapper;
