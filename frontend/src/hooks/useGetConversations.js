import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const [usersRes, convsRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/conversations"),
        ]);

        const users = await usersRes.json();
        if (users.error) throw new Error(users.error);

        if (convsRes.ok) {
          const convs = await convsRes.json();
          if (Array.isArray(convs)) {
            // Build map: otherUserId -> conversation updatedAt
            const orderMap = {};
            convs.forEach((c) => {
              const otherId = c.participants.find(
                (p) => p !== authUser._id
              );
              if (otherId) orderMap[otherId] = c.updatedAt;
            });

            // Sort: users with recent convs first, then alphabetical
            users.sort((a, b) => {
              const aTime = orderMap[a._id]
                ? new Date(orderMap[a._id])
                : new Date(0);
              const bTime = orderMap[b._id]
                ? new Date(orderMap[b._id])
                : new Date(0);
              return bTime - aTime;
            });
          }
        }

        setConversations(users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [authUser._id]);

  return { loading, conversations };
};

export default useGetConversations;