import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Badge, Spin, message, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import {
  ShoppingCartOutlined,
  GiftOutlined,
  MessageOutlined,
  PhoneOutlined,
  LinkOutlined,
  GoogleOutlined,
  WindowsOutlined
} from "@ant-design/icons";
import { setSelectedConversation, fetchConversations } from "../../../redux/slices/conversationSlice";

const getIconComponent = (platform) => {
  switch (platform.toLowerCase()) {
    case 'google':
      return <GoogleOutlined />;
    case 'outlook':
      return <WindowsOutlined />;
    case 'shopping':
      return <ShoppingCartOutlined />;
    case 'gift':
      return <GiftOutlined />;
    case 'message':
      return <MessageOutlined />;
    case 'phone':
      return <PhoneOutlined />;
    case 'link':
      return <LinkOutlined />;
    default:
      return <MessageOutlined />;
  }
};

const getPlatformName = (platform) => {
  switch (platform.toLowerCase()) {
    case 'google':
      return 'Google';
    case 'outlook':
      return 'Outlook';
    case 'shopping':
      return 'Shopping';
    case 'gift':
      return 'Gift';
    case 'message':
      return 'Message';
    case 'phone':
      return 'Phone';
    case 'link':
      return 'Link';
    default:
      return 'Message';
  }
};

const formatMessageTime = (timestamp) => {
  const messageTime = moment(timestamp);
  const now = moment();
  const diffMinutes = now.diff(messageTime, 'minutes');
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = now.diff(messageTime, 'days');

  if (diffMinutes < 1) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}w ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}mo ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years}y ago`;
  }
};

const MessageInboundConv = () => {
  const dispatch = useDispatch();
  const { selectedConversation, conversations, loading, error } = useSelector((state) => state.conversation);
  const { connectors } = useSelector((state) => state.channels);
  const { user } = useSelector((state) => state.login);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const token = localStorage.getItem("authToken");
  const [selectedConv, setSelectedConv] = useState(null);

  // Memoize the default platforms calculation
  const defaultPlatforms = React.useMemo(() => 
    Array.isArray(connectors) ? connectors.map(connector => connector.type.toLowerCase()) : [],
    [connectors]
  );

  // Memoize the fetch conversations function
  const fetchConversationsData = useCallback(async (platforms) => {
    if (!platforms.length) {
      message.warning("No channels selected");
      return;
    }

    try {
      const userId = user?.user?.id || user?.id;
      if (!userId || !token) {
        throw new Error("Missing user ID or authentication token");
      }

      await dispatch(fetchConversations({ 
        userId, 
        token, 
        platforms 
      })).unwrap();
    } catch (error) {
      message.error(error.message || "Failed to fetch conversations");
      console.error("Error fetching conversations:", error);
    }
  }, [dispatch, user, token]);

  // Effect for initial data fetch
  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      if (!defaultPlatforms.length) {
        message.warning("No channels available");
        return;
      }

      if (!hasAttemptedLoad) {
        try {
          setIsInitialLoad(true);
          await fetchConversationsData(defaultPlatforms);
          if (isMounted) {
            setHasAttemptedLoad(true);
          }
        } finally {
          if (isMounted) {
            setIsInitialLoad(false);
          }
        }
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [defaultPlatforms, fetchConversationsData, hasAttemptedLoad]);

  // Effect for selecting the first conversation
  useEffect(() => {
    if (!selectedConversation && conversations.length > 0) {
      dispatch(setSelectedConversation(conversations[0]));
    }
  }, [conversations, selectedConversation, dispatch]);

  const handleConversationSelect = (conversation) => {
    setSelectedConv(conversation);
    dispatch(setSelectedConversation(conversation));
  };

  const handleRetry = useCallback(() => {
    setHasAttemptedLoad(false);
    fetchConversationsData(defaultPlatforms);
  }, [defaultPlatforms, fetchConversationsData]);

  const processConversations = () => {
    if (!conversations?.results) return [];
    
    return conversations.results.flatMap(result => 
      result.conversations.map(conversation => ({
        id: conversation.id,
        name: conversation.messages[0]?.sender?.name || 'Unknown',
        platform: result.platform,
        message: conversation.body,
        time: conversation.received_at,
        subject: conversation.subject,
        thread_id: conversation.thread_id,
        messages: conversation.messages
      }))
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Spin spinning={true} tip="Loading conversations...">
            <div className="p-8" />
          </Spin>
        </div>
      );
    }

    const processedConversations = processConversations();

    if (processedConversations.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
          <MessageOutlined className="text-4xl mb-2" />
          <p className="text-center">No conversations found</p>
          <p className="text-sm text-gray-400 mt-1">Select different channels or try again</p>
          <button 
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      );
    }

    return processedConversations.map((msg) => (
      <div
        key={msg.id}
        className={`p-3 px-4 flex flex-col gap-1 cursor-pointer border-b border-gray hover:bg-gray-50 transition-colors duration-200
          ${selectedConv?.id === msg.id ? "border-l-4 border-gray bg-lightGray" : ""}`}
        onClick={() => handleConversationSelect(msg)}
      >
        {/* Message Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="bg-gray200 text-gray900">
              {msg.name[0].toUpperCase()}
            </Avatar>
            <div>
              <p className="font-medium truncate max-w-[150px] sm:max-w-[200px]">{msg.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip title={getPlatformName(msg.platform)} placement="top">
              <span className="text-lg text-gray-500">
                {getIconComponent(msg.platform)}
              </span>
            </Tooltip>
          </div>
        </div>

        {/* Message Content */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm truncate flex-1 text-gray900">
            {msg.message}
          </p>
          <span className="text-xs whitespace-nowrap text-gray-500">
            {formatMessageTime(msg.time)}
          </span>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray flex items-center justify-between min-h-14">
        <h2 className="font-semibold text-lg">All Conversations</h2>
        <Badge 
          count={processConversations().length} 
          className="text-gray font-semibold" 
          style={{ backgroundColor: "transparent", color: "gray", fontWeight: "bold" }} 
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default MessageInboundConv;

