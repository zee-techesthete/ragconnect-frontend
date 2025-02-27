import React, { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";

const ChatInput = ({ suggestions, data }) => {
  const [formData, setFormData] = useState({
    companySize: "",
  });

  return (
    <div className="flex items-start p-3 bg-gray300 rounded-xl max-h-96 overflow-y-auto">
      {suggestions ? (
        <div className="flex flex-wrap items-start p-3 bg-gray-300 rounded-xl gap-4">
          {data.map((size) => (
            <PrimaryBtn
              key={size}
              title={size}
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  companySize: size,
                }))
              }
              className={
                formData.companySize === size ? "border-black" : "bg-white"
              }
            />
          ))}
        </div>
      ) : (
        <>
          <textarea
            className="flex-grow p-2 focus:outline-none resize-none min-h-12 max-h-40 bg-transparent"
            placeholder="Enter your company website or social media link"
          ></textarea>
          <PrimaryBtn
            icon="arrow_upward"
            className="py-2 px-0 pl-2 rounded-xl bg-white"
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;
