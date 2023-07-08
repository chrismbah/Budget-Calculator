import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Alert() {
  const { alert } = useContext(AppContext);

  return <div className={`alert alert-${alert.type}`}>{alert.text}</div>;
}
