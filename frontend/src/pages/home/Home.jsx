import Sidebar from  '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';
import useConversation from '../../zustand/useConversation';
import { useEffect, useState } from 'react';

const Home = () => {
  const { selectedConversation } = useConversation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return (
    <div style={{
      display: "flex",
      width: isMobile ? "100vw" : "min(900px, 100vw)",
      height: "100svh",
      borderRadius: isMobile ? 0 : 16,
      overflow: "hidden",
      border: isMobile ? "none" : "0.5px solid #1e2030",
      boxShadow: isMobile ? "none" : "0 25px 60px rgba(0,0,0,0.6)",
      position: "relative"
    }}>
      {/* Sidebar — always on desktop, only when no chat selected on mobile */}
      <div style={{
        width: isMobile ? "100%" : "280px",
        flexShrink: 0,
        display: isMobile && selectedConversation ? "none" : "flex",
        flexDirection: "column",
      }}>
        <Sidebar />
      </div>

      {/* Chat — always on desktop, only when chat selected on mobile */}
      <div style={{
        flex: 1,
        display: isMobile && !selectedConversation ? "none" : "flex",
        flexDirection: "column",
        minWidth: 0,
      }}>
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;