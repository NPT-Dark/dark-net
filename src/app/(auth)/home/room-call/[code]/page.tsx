import RoomCallContent from "~/components/contents/roomCall";

type ParamType = Promise<{
  code: string;
}>;

export default function Page({
  params,
}: {
  params: ParamType;
}): React.ReactNode {
  return <RoomCallContent params={params} />;
}
