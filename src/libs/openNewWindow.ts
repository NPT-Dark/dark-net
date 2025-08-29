export const handleOpenWindowRoomCall = ({ code }: { code: string }) => {
  window.open(
    "home/room-call/" + code,
    "_blank",
    "width=800,height=600,toolbar=no,menubar=no,location=no,status=no,resizable=yes"
  );
};
