import Image from "next/image";
import { PageSection } from "../../components/PageSection";

export default function ProofDocumentsPage() {
  return (
    <PageSection title="증명서류 보기" className="p-4 sm:p-8">
      <div className="flex items-center justify-center">
        <Image
          src="/image/page/proof-test-image.png"
          alt="증명 서류"
          width={600}
          height={800}
          priority
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </PageSection>
  );
}
