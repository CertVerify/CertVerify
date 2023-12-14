import React from 'react'
// import Home from '../images/home.svg'
import { ReactComponent as Home } from "../images/home.svg";
import { ReactComponent as Generated } from "../images/generated.svg";
import { ReactComponent as Starred } from "../images/starred.svg";
import { ReactComponent as Verify } from "../images/verify.svg";
import { ReactComponent as Deleted } from "../images/deleted.svg";
import { ReactComponent as Hover } from "../images/hover.svg";

export const SidebarData = [
  {
    title : "Home",
    icon : <Home />,
    hov : <Hover />,
    link : "/home",
  },
  {
    title : "Generated",
    icon : <Generated />,
    hov : <Hover />,
    link : "/home",
  },
  {
    title : "Starred",
    icon : <Starred />,
    hov : <Hover />,
    link : "/home",
  },
  {
    title : "Verify",
    icon : <Verify />,
    hov : <Hover />,
    link : "/home",
  },
  {
    title : "Deleted",
    icon : <Deleted />,
    hov : <Hover />,
    link : "/home",
  },
];

