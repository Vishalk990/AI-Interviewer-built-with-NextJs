import React from "react";
import Header from "../dashboard/_components/Header";

function Upgrade({ children }) {
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36 my-4">{children}</div>
    </div>
  );
}

export default Upgrade;
