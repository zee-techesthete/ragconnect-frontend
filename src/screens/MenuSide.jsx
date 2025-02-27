import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Connector from "./menuScreens/Connector";
import Header from "../components/Header";
import MessageInbound from "./menuScreens/Message/MessageInbound";
import EmailList from "./Emails/EmailList";
import axios from "axios";
import dummyEmails from "../dummyEmails";

const rootUrl = import.meta.env.VITE_ROOT_URL;

const MenuSide = ({ selectedMenu }) => {
  const [emails, setEmails] = useState([]);
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("user_id");
  };

  const userId = getQueryParams();

  const renderContent = () => {
    switch (selectedMenu) {
      case "home":
        return <div>Home Content</div>;
      case "inbound":
        return <MessageInbound />;
      case "customerHub":
        return <div>Customer Hub Content</div>;
      case "trainingHub":
        return <div>Training Hub Content</div>;
      case "connector":
        return <Connector />;
      case "agentSetting":
        return <div>Agent Settings Content</div>;
      default:
        return <EmailList emails={emails} />;
    }
  };

  // useEffect(() => {
  //   // Here we're using dummy data for now
  //   setEmails(dummyEmails);
  // }, []);

  useEffect(() => {
    const fetchEmails = async (userId) => {
      console.log("*userId: ", userId);
      try {
        const response = await axios.get(`${rootUrl}/api/emails/fetch`, {
          params: { user_id: userId }, // replace with actual user_id
        });

        if (response.data.success) {
          setEmails(response.data.emails);
        } else {
          console.error("Failed to fetch emails:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    if (userId) fetchEmails(userId);
  }, [userId]);

  return (
    <div className="flex-1 p-5">
      <Header />
      {renderContent()}
    </div>
  );
};

export default MenuSide;
