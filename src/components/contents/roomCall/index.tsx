"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Disconnect from "./components/disconnect";
import Processing from "./components/processing";
import setupCall from "./funcs/callSetup";
import { TransportType } from "./funcs/type";
import ListVideoReceiver, { VideoItem } from "./components/receiverVideo";
import { socket } from "~/providers/socket";
import listenEvent from "./funcs/listenEvent";
// import monitorAudioTrack from "./funcs/monitorAudio";

type ParamType = Promise<{
  code: string;
}>;

export default function RoomCallContent({
  params,
}: {
  params: ParamType;
}): React.ReactNode {
  const { data: session } = useSession();
  const [receiverVideo, setReceiverVideo] = useState<MediaStream[]>([]);
  const [localVideo, setLocalVideo] = useState<MediaStream | null>(null);
  const [receiverTransport, setReceiverTransport] =
    useState<TransportType | null>(null);
  const [rtpCapabilities, setRtpCapabilities] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function handleRoom({ userId }: { userId: string }) {
    const { code } = await params;
    await setupCall({
      roomId: code,
      userId,
      setReceiverTransport,
      setLocalVideo,
      setReceiverVideo,
      setRtpCapabilities,
    });
    setLoading(false);
  }

  useEffect(() => {
    if (session?.user.id) {
      console.log("abc");
      console.log("loading", loading);

      handleRoom({ userId: session?.user.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (!loading && receiverTransport && rtpCapabilities) {
      listenEvent({
        receiver: receiverTransport,
        userId: session?.user.id,
        socket,
        params,
        setReceiverVideo,
        rtpCapabilities,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, loading, receiverTransport, rtpCapabilities]);
  // useEffect(() => {
  //   if (localVideo) {
  //     console.log("-------Local tracks--------");
  //     localVideo.getTracks().map((t) => {
  //       monitorAudioTrack(t, "sender");
  //     });
  //   }
  //   if (receiverVideo.length !== 0) {
  //     console.log("--------Receiver tracks--------");
  //     receiverVideo.map((s) =>
  //       s.getTracks().map((t) => {
  //         monitorAudioTrack(t, "receiver");
  //       })
  //     );
  //   }
  // }, [receiverVideo, localVideo]);
  if (loading) return <Processing />;
  if (!localVideo) return <Disconnect />;
  return (
    <div className="grid grid-cols-2 gap-2 w-full h-full p-4">
      <div className="bg-black rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center">
        <VideoItem mute stream={localVideo} />
        <p className="absolute text-white">{session?.user.displayName}</p>
      </div>
      <ListVideoReceiver streams={receiverVideo} />
    </div>
  );
}
