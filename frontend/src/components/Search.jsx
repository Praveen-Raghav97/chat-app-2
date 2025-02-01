import React, { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react"; // Lucide React for icons
import _ from "lodash"; // Lodash for debouncing
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
const usersData = [
  { id: 1, name: "John Doe", username: "johndoe" },
  { id: 2, name: "Jane Smith", username: "janesmith" },
  { id: 3, name: "Alice Johnson", username: "alicej" },
  { id: 4, name: "Bob Brown", username: "bobbrown" },
];

const Searchbar = () => {
   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  
  // Debounced Search Function
  const handleSearch = useCallback(
    _.debounce((searchText) => {
      if (!searchText) {
        setFilteredUsers([]);
      } else {
        const filtered = users.filter((user) =>
         
          user.fullName.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    }, 300), // 300ms delay
    []
  );

  // Update search results on query change
  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  return (
    <div className="w-full max-w-md mx-auto p-2 bg-base-100 shadow-md rounded-xl">
      {/* Search Input Field */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>

      {/* Show search results only when user starts typing */}
      {query && (
        <ul className="mt-4 max-h-60 overflow-auto bg-base-200 shadow-md rounded-md">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <button
              key={user._id}
              onClick={() => 
                setSelectedUser(user)
               
               }
              className={`
                flex w-full mb-2 flex-row items-center gap-3 md:p-3
                hover:bg-base-300 transition-colors hover:rounded-full p-1
                ${selectedUser?._id === user._id ? "bg-base-500 ring-1 ring-base-300" : ""}
              `}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-10 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>
  
              {/* User info - only visible on larger screens */}
              <div className=" md:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                
              </div>
            </button>
            ))
          ) : (
            <p className="text-gray-500 mt-2 p-2">No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
