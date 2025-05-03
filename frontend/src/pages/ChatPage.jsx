import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const clientRef = useRef(null);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  // Use refetchOnWindowFocus to ensure tokens are fresh when tab is focused
  const { data: tokenData, refetch } = useQuery({
    queryKey: ["streamToken", authUser?._id], // Include user ID in key to refetch when user changes
    queryFn: getStreamToken,
    enabled: !!authUser,
    staleTime: 1000 * 60 * 5, // Consider data stale after 5 minutes
    refetchOnWindowFocus: true,
  });

  // Cleanup previous client when user changes or component unmounts
  useEffect(() => {
    return () => {
      if (clientRef.current) {
        try {
          // Ensure any existing client is disconnected on unmount or user change
          clientRef.current.disconnectUser();
          console.log("Previous client disconnected");
        } catch (error) {
          console.error("Error disconnecting previous client:", error);
        } finally {
          clientRef.current = null;
        }
      }
    };
  }, [authUser?._id]); // This effect runs on user change or unmount

  // Initialize chat when token and user are available
  useEffect(() => {
    // Reset states when dependencies change
    setChatClient(null);
    setChannel(null);
    setLoading(true);

    const initChat = async () => {
      if (!tokenData?.token || !authUser) {
        setLoading(false);
        return;
      }

      try {
        console.log("Initializing stream chat client...");

        // Force disconnect any existing client
        if (clientRef.current) {
          try {
            await clientRef.current.disconnectUser();
            console.log("Disconnected previous client");
          } catch (err) {
            console.log("No previous client to disconnect or error:", err);
          }
        }

        // Create a new client instance with timeout options
        const client = StreamChat.getInstance(STREAM_API_KEY, {
          timeout: 10000, // Increase timeout to 10 seconds
          reconnectionTimeout: 10000,
        });
        
        clientRef.current = client;

        // Verify we have valid token and user ID
        if (!tokenData.token || !authUser._id) {
          throw new Error("Missing token or user ID");
        }

        // Connect user
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        // Create channel
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        
        // Show more specific error messages
        if (error.message?.includes("token")) {
          toast.error("Authentication error. Please try logging in again.");
        } else if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
          toast.error("Connection timed out. Please check your internet and try again.");
        } else {
          toast.error("Could not connect to chat. Please try again.");
        }
        
        // Clean up on error
        if (clientRef.current) {
          try {
            await clientRef.current.disconnectUser();
          } catch (disconnectError) {
            console.error("Error disconnecting client:", disconnectError);
          } finally {
            clientRef.current = null;
          }
        }
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
export default ChatPage;
