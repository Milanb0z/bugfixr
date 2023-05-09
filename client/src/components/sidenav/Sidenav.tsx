import React from "react";

import { Link } from "react-router-dom";

import classes from "./sidenav.module.scss";

type link = {
  title: string;
  link: string;
};

type Props = {
  links: link[];
};

const Sidenav = ({ links }: Props) => {
  return (
    <nav className={classes.nav}>
      <div className={classes.logo}>
        <h2>bugFixr</h2>
      </div>

      <ul className={classes.links}>
        {links.map((link) => (
          <Link key={link.link} to={link.link}>
            <li className={classes.links_link}>
              <p>{link.title}</p>
            </li>
          </Link>
        ))}
      </ul>

      <div className={classes.credits}>
        <p>
          Developed By <u>milanb0z</u>
        </p>
      </div>
    </nav>
  );
};

export default Sidenav;
