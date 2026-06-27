import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const EMOJIS = ["🦄","🐱","🦊","🐸","🐼","🦁","🐯","🐨","🐧","🎃"];

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <span className="loading loading-spinner" style={{ color: "#3b82f6" }}></span>
        </div>
      ) : (
        conversations.map((conv, idx) => (
          <Conversation
            key={conv._id}
            conversation={conv}
            lastIdx={idx === conversations.length - 1}
            emoji={EMOJIS[idx % EMOJIS.length]}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;