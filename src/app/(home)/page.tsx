import { ContentLayout } from "@/components/layout/ContentLayout";
import { Metadata } from "next";
import { MinesGame } from "./components/MinesGame";

export const metadata: Metadata = {
  title: "Mines Game",
  description:
    "Streamlined version of the popular Mines game following provided design.",
};

export default function Home() {
  return (
    <ContentLayout>
      <MinesGame />
    </ContentLayout>
  );
}
