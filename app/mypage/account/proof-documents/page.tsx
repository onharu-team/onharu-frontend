"use client";

import Image from "next/image";
import { PageSection } from "../../components/PageSection";
import { ChildData } from "@/lib/api/types/auth";
import { useAuthProfile } from "@/hooks/useAuth";

export default function ProofDocumentsPage() {
  const { data: profileData } = useAuthProfile();

  const profile = profileData as ChildData;

  const imageSrc = typeof profile.images[0] === "string" && profile.images[0];

  return (
    <PageSection title="증명서류 보기" className="px-4 pt-4 pb-7.5 sm:pt-9 sm:pb-15">
      <div className="flex items-center justify-center">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="증명 서류"
            width={600}
            height={800}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        ) : (
          <div>등록된 증명서류가 없습니다.</div>
        )}
      </div>
    </PageSection>
  );
}
