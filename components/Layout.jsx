import React from "react";
import Navbar from "./Nav";

export default function Layout(props) {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
}
