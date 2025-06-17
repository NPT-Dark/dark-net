"use client";
import React, { useRef, useState } from "react";

export default function WebRTCCall() {
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const remoteAudio = useRef<HTMLAudioElement>(null);
  const pcRef = useRef<RTCPeerConnection>(null);
  const [offer, setOffer] = useState("");
  const [answer, setAnswer] = useState("");
  const [remoteSDP, setRemoteSDP] = useState("");
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);

  const start = async () => {
    let stream: MediaStream | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl: true,
          noiseSuppression: false,
          echoCancellation: false,
        },
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Không tìm thấy thiết bị microphone!");
      return;
    }
    // Không cần xử lý video local nếu chỉ có mic

    const pc = new RTCPeerConnection();
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    pc.ontrack = (event) => {
      const remoteStream = event.streams[0];
      console.log("Remote stream received:", remoteStream);
      console.log("alsjdhjahsdhasd", remoteStream.getVideoTracks());

      if (remoteStream.getVideoTracks().length > 0 && remoteVideo.current) {
        remoteVideo.current.srcObject = remoteStream;
        remoteVideo.current.muted = false;
        remoteVideo.current.volume = 1;
        setHasRemoteVideo(true);
      } else if (remoteAudio.current) {
        remoteAudio.current.srcObject = remoteStream;
        remoteAudio.current.muted = false;
        remoteAudio.current.volume = 1;
        setHasRemoteVideo(false);
        remoteAudio.current.play().catch((e) => {
          // Một số trình duyệt yêu cầu thao tác người dùng mới phát được audio
          console.warn("Audio play error:", e);
        });
      }
      console.log("Remote audio tracks:", remoteStream.getAudioTracks());
    };
    pcRef.current = pc;
  };

  const createOffer = async () => {
    if (!pcRef.current) return;
    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    setOffer(JSON.stringify(offer));
  };

  const createAnswer = async () => {
    if (!pcRef.current) return;
    const remoteDesc = new RTCSessionDescription(JSON.parse(remoteSDP));
    await pcRef.current.setRemoteDescription(remoteDesc);
    const answer = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answer);
    setAnswer(JSON.stringify(answer));
  };

  const setRemoteAnswer = async () => {
    if (!pcRef.current) return;
    const remoteDesc = new RTCSessionDescription(JSON.parse(remoteSDP));
    await pcRef.current.setRemoteDescription(remoteDesc);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4">
        {/* Local video không cần nếu chỉ có mic */}
        {hasRemoteVideo ? (
          <video
            ref={remoteVideo}
            autoPlay
            playsInline
            width={240}
            height={180}
            style={{ background: "#222" }}
          />
        ) : (
          <audio
            ref={remoteAudio}
            autoPlay
            controls
            style={{ display: "block" }}
          />
        )}
      </div>
      <div className="flex gap-2">
        <button className="btn-primary" onClick={start}>
          Start Mic
        </button>
        <button className="btn-primary" onClick={createOffer}>
          Create Offer
        </button>
        <button className="btn-primary" onClick={createAnswer}>
          Create Answer
        </button>
        <button className="btn-primary" onClick={setRemoteAnswer}>
          Set Remote
        </button>
      </div>
      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Paste remote SDP here"
        value={remoteSDP}
        onChange={(e) => setRemoteSDP(e.target.value)}
      />
      <div className="w-full">
        <div>
          <b>Offer/Answer (copy to remote):</b>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={offer || answer}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
