"use client";
import { useParams } from "next/navigation";
import { useGetCanvasState } from "@/hooks/useCanvas";
import { useGetCampaign } from "@/hooks/useCampaign";
import RenderCanvas from "@/app/_components/RenderCanvas";

export default function CanvasPage() {
  const { id } = useParams();
  const { data: canvasData, isLoading: isCanvasLoading } = useGetCanvasState(id);
  const { data: campaign, isLoading: isCampaignLoading } = useGetCampaign(id);

  // if (isCanvasLoading || isCampaignLoading) {
  //   return <div className="text-white text-center mt-10">Loading canvas...</div>;
  // }

  // if (!canvasData || !campaign) {
  //   return <div className="text-white text-center mt-10">No data found</div>;
  // }

  return <RenderCanvas campaign={campaign} canvasData={canvasData} />;
}
