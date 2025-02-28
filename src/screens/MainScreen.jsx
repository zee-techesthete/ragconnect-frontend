import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MenuSide from "./MenuSide";

const MainScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="flex">
      {/* <Sidebar onSelectMenu={handleSelectMenu} className="w-1/3" /> */}
      <MenuSide selectedMenu={selectedMenu} className="w-2/3" />
    </div>
  );
};

export default MainScreen;
