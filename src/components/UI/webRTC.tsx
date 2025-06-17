"use client";
import React, { useRef, useState } from "react";

export default function WebRTCCall() {
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const remoteAudio = useRef<HTMLAudioElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const [offer, setOffer] = useState("");
  const [answer, setAnswer] = useState("");
  const [remoteSDP, setRemoteSDP] = useState("");
  const [remoteICE, setRemoteICE] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localICE, setLocalICE] = useState<any[]>([]);
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

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

    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      const remoteStream = event.streams[0];
      if (remoteStream.getVideoTracks().length > 0 && remoteVideo.current) {
        remoteVideo.current.srcObject = remoteStream;
        remoteVideo.current.muted = false;
        setHasRemoteVideo(true);
      }
      if (remoteStream.getAudioTracks().length > 0 && remoteAudio.current) {
        remoteAudio.current.srcObject = remoteStream;
        remoteAudio.current.muted = false;
        setAudioReady(true);
        remoteAudio.current.play().catch((e) => {
          console.warn("Audio play error:", e);
        });
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pc.onicecandidate = (event: any) => {
      if (event?.candidate !== null) {
        setLocalICE((prev) => [...prev, event?.candidate.toJSON()]);
      }
    };
  };

  const createOffer = async () => {
    if (!pcRef.current) return;
    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    setOffer(JSON.stringify(offer, null, 2));
  };

  const createAnswer = async () => {
    if (!pcRef.current || !remoteSDP.trim()) {
      alert("Remote SDP rỗng!");
      return;
    }

    try {
      const remoteDesc = new RTCSessionDescription(JSON.parse(remoteSDP));
      await pcRef.current.setRemoteDescription(remoteDesc);
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      setAnswer(JSON.stringify(answer, null, 2));
    } catch (err) {
      alert("Lỗi khi tạo answer: Kiểm tra SDP!");
      console.error(err);
    }
  };

  const setRemoteAnswer = async () => {
    if (!pcRef.current || !remoteSDP.trim()) {
      alert("Remote SDP rỗng!");
      return;
    }

    try {
      const remoteDesc = new RTCSessionDescription(JSON.parse(remoteSDP));
      await pcRef.current.setRemoteDescription(remoteDesc);
    } catch (err) {
      alert("Lỗi khi setRemoteAnswer: JSON không hợp lệ!");
      console.error(err);
    }
  };

  const addRemoteICE = async () => {
    if (!pcRef.current || !remoteICE.trim()) {
      alert("Remote ICE rỗng!");
      return;
    }

    try {
      const raw = JSON.parse(remoteICE);
      const candidates: RTCIceCandidateInit[] = Array.isArray(raw)
        ? raw.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          )
        : [];

      for (const candidate of candidates) {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }

      alert("Thêm remote ICE thành công!");
    } catch (err) {
      console.error("Lỗi parse ICE:", err);
      alert("Remote ICE không hợp lệ!");
    }
  };

  const playAudio = () => {
    if (remoteAudio.current) {
      remoteAudio.current.play();
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4">
        {hasRemoteVideo && (
          <video
            ref={remoteVideo}
            autoPlay
            playsInline
            width={240}
            height={180}
            style={{ background: "#222" }}
          />
        )}
        <audio
          ref={remoteAudio}
          autoPlay
          controls
          style={{ display: "block" }}
        />
      </div>

      {audioReady && (
        <button className="btn-primary" onClick={playAudio}>
          Play Remote Audio
        </button>
      )}

      <div className="flex gap-2 flex-wrap">
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
          Set Remote SDP
        </button>
        <button className="btn-primary" onClick={addRemoteICE}>
          Add Remote ICE
        </button>
      </div>

      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Paste remote SDP here"
        value={remoteSDP}
        onChange={(e) => setRemoteSDP(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Paste remote ICE candidates here"
        value={remoteICE}
        onChange={(e) => setRemoteICE(e.target.value)}
      />

      <div className="w-full">
        <div>
          <b>Offer/Answer (copy to remote):</b>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={offer || answer}
            readOnly
          />
        </div>

        <div>
          <b>Local ICE Candidates (copy to remote):</b>
          <textarea
            className="w-full p-2 border rounded text-xs"
            rows={4}
            value={JSON.stringify(localICE, null, 2)}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
