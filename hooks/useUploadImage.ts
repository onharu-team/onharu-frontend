import { getPresignedUrl } from "@/lib/api/getPresignedUrl";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const res = await getPresignedUrl(file.name, file.type);
      const { presignedUrl, downloadUrl } = res.data;

      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("S3 업로드 실패");
      }

      return downloadUrl;
    },
  });
};
