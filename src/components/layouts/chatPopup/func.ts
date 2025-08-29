import { Session } from "next-auth";
import { toastError } from "~/components/ui/toastGlobal";
import { handleOpenWindowRoomCall } from "~/libs/openNewWindow";

export async function handleCall({
  id,
  session,
}: {
  id: string;
  session: Session | null;
}) {
  if (!session) return;
  const rs = await fetch(process.env.NEXT_PUBLIC_API_URL + `/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hostId: session?.user.id, receiverIds: [id] }),
  });
  if (!rs.ok) {
    return toastError({ message: "Create room error" });
  }
  const roomGenerate = await rs.json();
  handleOpenWindowRoomCall({ code: roomGenerate?._id });
}
