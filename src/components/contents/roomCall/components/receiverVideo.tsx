import { useEffect, useRef } from "react";

type Props = {
  streams: MediaStream[];
};

export default function ListVideoReceiver({ streams }: Props) {
  return streams.map((stream, i) => <VideoItem key={i} stream={stream} />);
}

export function VideoItem({
  stream,
  mute,
}: {
  stream: MediaStream;
  mute?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const hasVideo = stream.getVideoTracks().length > 0;

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  // Render video nếu có video track, ngược lại render audio
  return hasVideo ? (
    <video
      ref={ref as React.RefObject<HTMLVideoElement>}
      autoPlay
      playsInline
      muted={mute}
      className="bg-black rounded-xl overflow-hidden shadow-lg"
    />
  ) : (
    <audio
      ref={ref as React.RefObject<HTMLAudioElement>}
      autoPlay
      controls
      muted={mute}
      className="rounded shadow"
    />
  );
}
