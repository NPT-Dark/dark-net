import type { Metadata } from "next";
import Introduce from "~/components/contents/introduce";
export const metadata: Metadata = {
  title: "Dark Net – The Future of Smart Social",
  description:
    "Built like a startup, powered by intelligence.\nDark Net is a next-gen social platform where AI does the heavy lifting—curating your feed, boosting meaningful connections, and cutting out the noise.\nDesigned for modern users who want more signal, less static.\nSleek. Fast. Private by design.",
};
export default function Home() {
  return <Introduce />;
}
