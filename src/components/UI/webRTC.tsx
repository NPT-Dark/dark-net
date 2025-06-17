"use client";
import React, { useRef, useState } from "react";

export default function WebRTCCall() {
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>(null);
  const [offer, setOffer] = useState("");
  const [answer, setAnswer] = useState("");
  const [remoteSDP, setRemoteSDP] = useState("");
  const [remoteMuted, setRemoteMuted] = useState(false);

  // Start local media: try video+audio, fallback to audio only
  const start = async () => {
    let stream: MediaStream | null = null;
    try {
      // Chỉ lấy microphone, không lấy camera
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.error("Error accessing media devices:", err);
      alert("Không tìm thấy thiết bị microphone!");
      return;
    }
    // Không cần xử lý video local
    const pc = new RTCPeerConnection();
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    pc.ontrack = (event) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = event.streams[0];
        remoteVideo.current.muted = false;
        remoteVideo.current.volume = 1;
        setRemoteMuted(remoteVideo.current.muted);
        console.log("Remote audio tracks:", event.streams[0].getAudioTracks());
      }
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

  // Nút để chủ động bật tiếng remote nếu bị mute do trình duyệt
  const unmuteRemote = () => {
    if (remoteVideo.current) {
      remoteVideo.current.muted = false;
      remoteVideo.current.volume = 1;
      setRemoteMuted(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4">
        <video
          ref={localVideo}
          autoPlay
          playsInline
          muted
          width={240}
          height={180}
          style={{ background: "#222" }}
        />
        <video
          ref={remoteVideo}
          autoPlay
          playsInline
          width={240}
          height={180}
          style={{ background: "#222" }}
        />
      </div>
      {remoteMuted && (
        <button className="btn-primary" onClick={unmuteRemote}>
          Unmute Remote
        </button>
      )}
      <div className="flex gap-2">
        <button className="btn-primary" onClick={start}>
          Start Camera/Mic
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
