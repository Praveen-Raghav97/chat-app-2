import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";
import Searchbar from "./Search";
import MusicPlayer from "./MusicPlayer";


const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="md:h-full  h-auto w-full lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 rounded-xl shadow-xl">
      <div className="border-b flex  gap-3 items-start md:flex-col-reverse  justify-between border-base-300 w-full p-3 md:p-5">
        <div className="flex items-center  gap-2">
          <Users className="size-6 hidden lg-block" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className=" flex items-center gap-2 ">
          <Searchbar/>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
        <div className="flex items-center">
        <MusicPlayer/>
        </div>
       
      </div>

      {/* User list with horizontal scrolling on mobile */}
      <div className="md:overflow-y-scroll  h-full scroll- overflow-x-scrool scroll-smooth w-full py-3 flex md:flex-col flex-row gap-3 px-3 md:px-0">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              flex flex-col md:flex-row items-center gap-3 md:p-3
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
            <div className="hidden md:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;