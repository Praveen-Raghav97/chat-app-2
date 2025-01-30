import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen mt-4 w-full bg-base-200">
      <div className="flex items-center justify-center pt-16 md:px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl  md:h-[calc(100vh-8rem)]">
          <div className=" flex  justify-around flex-col md:flex-row  md:gap-10 md:px-8  md:py-8 md:h-full h-screen  rounded-lg ">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
