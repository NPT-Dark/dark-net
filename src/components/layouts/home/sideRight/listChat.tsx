import { socket } from "~/providers/socket";
import React, { useEffect, useState } from "react";
import { ItemChat } from "./item";
import { IUserChat } from "~/types/user";
import { useDispatch } from "react-redux";
import { pushChatPopup } from "~/store/slices/chatPopup";

export default function ListChats(): React.ReactNode {
  const dispatch = useDispatch();
  const [listChatData, setListChatData] = useState<IUserChat[]>([]);
  useEffect(() => {
    async function fetchListChat() {
      const response = await fetch("/api/user/list");
      console.log("response", response);
      if (!response.ok) {
        return setListChatData([]);
      }
      const data = await response.json();
      return setListChatData(data);
    }
    fetchListChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
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
