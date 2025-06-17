"use client";
// import type { Metadata } from "next";
import WebRTCCall from "~/components/UI/webRTC";
// export const metadata: Metadata = {
//   title: "Dark Net – The Future of Smart Social",
//   description:
//     "Built like a startup, powered by intelligence.\nDark Net is a next-gen social platform where AI does the heavy lifting—curating your feed, boosting meaningful connections, and cutting out the noise.\nDesigned for modern users who want more signal, less static.\nSleek. Fast. Private by design.",
// };
export default function Home() {
  const testMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl: true,
          noiseSuppression: false,
          echoCancellation: false,
        },
      });
      const audio = new Audio();
      audio.srcObject = stream;
      audio.play();
      alert(
        "Đang phát thử tiếng micro. Nếu nghe thấy tiếng mình, micro hoạt động bình thường."
      );
      setTimeout(() => {
        stream.getTracks().forEach((track) => track.stop());
        audio.pause();
      }, 5000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Không tìm thấy thiết bị microphone!");
    }
  };
  return (
    <div className="flex w-full justify-between flex-1 mt-[200px]">
      <WebRTCCall />
      <button className="btn-primary" onClick={testMic}>
        Test Mic
      </button>
    </div>
  );
}
