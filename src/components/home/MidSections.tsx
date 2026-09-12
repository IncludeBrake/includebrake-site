import { MidApproachSections } from "@/components/home/MidApproachSections";
import { MidPrimarySections } from "@/components/home/MidPrimarySections";
import type { InquiryService } from "@/components/InquiryDialog";

type Props = {
  onInquire: (service?: InquiryService) => void;
};

export function MidSections({ onInquire }: Props) {
  return (
    <>
      <MidPrimarySections onInquire={onInquire} />
      <MidApproachSections />
    </>
  );
}
