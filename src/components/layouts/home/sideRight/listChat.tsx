import { socket } from "~/providers/socket";
import React, { useEffect, useState } from "react";
import { ItemChat } from "./item";
import { IUserChat } from "~/types/user";
import { useDispatch } from "react-redux";
import { pushChatPopup } from "~/store/slices/chatPopup";
import { useSession } from "next-auth/react";

export default function ListChats(): React.ReactNode {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [listChatData, setListChatData] = useState<IUserChat[]>([]);
  useEffect(() => {
    async function fetchListChat() {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/user/get-list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        return setListChatData([]);
      }
      const data: IUserChat[] = await response.json();
      return setListChatData(
        data.filter((item) => item._id !== session?.user.id)
      );
    }
    fetchListChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, session]);
  return listChatData.map((item) => (
    <ItemChat
      key={item._id}
      avatar={item?.profileImage}
      displayName={item.displayName}
      onClick={() => {
        dispatch(
          pushChatPopup({
            _id: item._id,
            displayName: item.displayName,
            profileImage: item.profileImage,
          })
        );
      }}
    />
  ));
}
