import * as mediasoup from "mediasoup-client";
export type RoomInfo = {
  router: any;
  transports: Map<string, mediasoup.types.Transport>;
  producers: Map<string, mediasoup.types.Producer>;
  consumers: Map<string, mediasoup.types.Consumer>;
};
