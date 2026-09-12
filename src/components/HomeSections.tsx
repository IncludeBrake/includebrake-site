import { MidSections } from "@/components/home/MidSections";
import { LowerSections } from "@/components/home/LowerSections";
import type { InquiryService } from "@/components/InquiryDialog";

type HomeSectionsProps = {
  onInquire: (service?: InquiryService) => void;
};

export function HomeSections({ onInquire }: HomeSectionsProps) {
  return (
    <>
      <MidSections onInquire={onInquire} />
      <LowerSections onInquire={onInquire} />
    </>
  );
}
