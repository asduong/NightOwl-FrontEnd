import React from "react";
import Camera from "./Camera";
import UserForm from "./Form/UserForm";

export default function FourthView() {
  return (
    <>
      <div>
        <Camera />
        <UserForm style={{ backgroundColor: "#373a47" }} />
      </div>
    </>
  );
}
