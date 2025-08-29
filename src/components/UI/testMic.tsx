"use client";
import React, { useRef, useState } from "react";

export default function TestMic(): React.ReactNode {
  const [isTestingMic, setIsTestingMic] = useState(false);
  const audioTestRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const handleStartRecording = async () => {
    try {
      setIsTestingMic(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        if (audioTestRef.current) {
          audioTestRef.current.src = url;
          audioTestRef.current.play().catch(console.error);
        }
        stream.getTracks().forEach((track) => track.stop());
        setIsTestingMic(false);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
    } catch (err) {
      console.error("🎤 Mic test error:", err);
      setIsTestingMic(false);
    }
  };

  const handleStopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center justify-center space-y-4">
      <button
        onMouseDown={handleStartRecording}
        onMouseUp={handleStopRecording}
        onMouseLeave={handleStopRecording}
        disabled={isTestingMic}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {isTestingMic ? "🎙️ Đang ghi..." : "🎤 Giữ để nói"}
      </button>
      <audio ref={audioTestRef} controls className="w-full" />
    </div>
  );
}
