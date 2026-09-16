import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as adminApi from "./adminApi.js";

export function useAdminMe() {
  return useQuery({ queryKey: ["admin-me"], queryFn: adminApi.me, retry: false });
}

export function useAdminLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username, password }) => adminApi.login(username, password),
    onSuccess: (data) => queryClient.setQueryData(["admin-me"], { authenticated: true, username: data.username }),
  });
}

export function useAdminLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.logout,
    onSuccess: () => queryClient.setQueryData(["admin-me"], { authenticated: false }),
  });
}

export function useAdminServices() {
  return useQuery({ queryKey: ["admin-services"], queryFn: adminApi.listServices });
}

function useInvalidateServices() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["admin-services"] });
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
  };
}

export function useCreateService() {
  const invalidate = useInvalidateServices();
  return useMutation({ mutationFn: adminApi.createService, onSuccess: invalidate });
}

export function useUpdateService() {
  const invalidate = useInvalidateServices();
  return useMutation({
    mutationFn: ({ id, payload }) => adminApi.updateService(id, payload),
    onSuccess: invalidate,
  });
}

export function useDeleteService() {
  const invalidate = useInvalidateServices();
  return useMutation({ mutationFn: adminApi.deleteService, onSuccess: invalidate });
}

export function useReorderServices() {
  const invalidate = useInvalidateServices();
  return useMutation({ mutationFn: adminApi.reorderServices, onSuccess: invalidate });
}
