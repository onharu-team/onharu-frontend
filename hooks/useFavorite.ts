import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getFavorites, toggleFavorite } from "@/lib/api/favorites";
import { Toast } from "@/components/feature/toast/Toast";

export const useFavoritesQuery = (params: { pageNum: number; perPage: number }) => {
  return useQuery({
    queryKey: ["favorites", params],
    queryFn: () => getFavorites(params),
    select: res => res.success && res.data,
  });
};

export const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storeId: number | string) => toggleFavorite(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
    onError: () => {
      Toast("error", "처리에 실패했습니다.", "잠시 후 다시 시도해주세요.");
    },
  });
};
