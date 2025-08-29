type PeerSignal = {
  offer: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  iceCandidates: RTCIceCandidateInit[];
};

export type InfoCallData = {
  roomId: string;
  from: string;
  peers: Record<string, PeerSignal>;
  callerInfo: {
    id: string;
    name: string;
    profileImage: string;
  };
  receiverInfos: Record<
    string,
    {
      id: string;
      name: string;
      profileImage: string;
    }
  >;
};

export type CallState = {
  infoCall: InfoCallData;
};
