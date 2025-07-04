export type IMakeCallData = {
  to: string;
  from: string;
  signalData: {
    type: "offer" | "answer";
    sdp: string;
  };
  callerInfo: {
    name: string;
    profileImage: string;
  };
};
