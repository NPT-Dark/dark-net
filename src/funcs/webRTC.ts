async function getDataCall() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        autoGainControl: true,
        noiseSuppression: false,
        echoCancellation: false,
      },
    });
    const pc = new RTCPeerConnection();
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    // pc.ontrack = (event) => {
    //   const remoteStream = event.streams[0];
    //   if (remoteStream.getVideoTracks().length > 0 && remoteVideo.current) {
    //     remoteVideo.current.srcObject = remoteStream;
    //     remoteVideo.current.muted = false;
    //   }
    //   if (remoteStream.getAudioTracks().length > 0 && remoteVideo.current) {
    //     remoteVideo.current.srcObject = remoteStream;
    //     remoteVideo.current.muted = false;
    //     setAudioReady(true);
    //     remoteVideo.current.play().catch((e) => {
    //       console.warn("Audio play error:", e);
    //     });
    //   }
    // };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ice: any = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pc.onicecandidate = (event: any) => {
      if (event?.candidate !== null) {
        ice.push(event?.candidate.toJSON());
      }
    };
    return {
      pc,
      stream,
      ice,
    };
  } catch (_: unknown) {
    console.error("Error accessing microphone:", _);
    return null;
  }
}

export { getDataCall };
