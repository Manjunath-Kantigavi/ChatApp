import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) return toast.error("Search must be at least 3 characters");
    const found = conversations.find(c =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (found) { setSelectedConversation(found); setSearch(""); }
    else toast.error("No user found!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#1a1d2e", border: "0.5px solid #1e2030",
        borderRadius: 10, padding: "8px 12px"
      }}>
        <svg width="15" height="15" fill="none" stroke="#475569" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: "none", border: "none", outline: "none",
            color: "#e2e8f0", fontSize: 13, width: "100%", fontFamily: "inherit"
          }}
        />
      </div>
    </form>
  );
};

export default SearchInput;