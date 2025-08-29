export default function monitorAudioTrack(
  track: MediaStreamTrack,
  type: "receiver" | "sender"
) {
  const audioContext = new AudioContext();
  const mediaStream = new MediaStream([track]);
  const source = audioContext.createMediaStreamSource(mediaStream);
  const analyser = audioContext.createAnalyser();

  analyser.fftSize = 256;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  source.connect(analyser);

  function checkVolume() {
    analyser.getByteFrequencyData(dataArray);
    const sum = dataArray.reduce((a, b) => a + b, 0);
    const average = sum / dataArray.length;

    // Log hoặc xử lý theo average volume
    if (average > 10) {
      console.log("🟢 Có âm thanh (volume)" + type);
    } else {
      console.log("🔇 Không có âm thanh (im lặng)" + type);
    }

    requestAnimationFrame(checkVolume);
  }

  checkVolume();
}
