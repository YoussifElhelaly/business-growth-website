import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./genericApi.js";

function useInvalidate(key) {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["admin-resource", key] });
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
  };
}

export function useCollection(key) {
  return useQuery({ queryKey: ["admin-resource", key], queryFn: () => api.listItems(key) });
}

export function useCreateItem(key) {
  const invalidate = useInvalidate(key);
  return useMutation({ mutationFn: (payload) => api.createItem(key, payload), onSuccess: invalidate });
}

export function useUpdateItem(key) {
  const invalidate = useInvalidate(key);
  return useMutation({ mutationFn: ({ id, payload }) => api.updateItem(key, id, payload), onSuccess: invalidate });
}

export function useDeleteItem(key) {
  const invalidate = useInvalidate(key);
  return useMutation({ mutationFn: (id) => api.deleteItem(key, id), onSuccess: invalidate });
}

export function useReorderItems(key) {
  const invalidate = useInvalidate(key);
  return useMutation({ mutationFn: (order) => api.reorderItems(key, order), onSuccess: invalidate });
}

export function useSingleton(key) {
  return useQuery({ queryKey: ["admin-resource", key], queryFn: () => api.getSingleton(key) });
}

export function useUpdateSingleton(key) {
  const invalidate = useInvalidate(key);
  return useMutation({ mutationFn: (payload) => api.updateSingleton(key, payload), onSuccess: invalidate });
}
