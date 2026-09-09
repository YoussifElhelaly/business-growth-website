import { useQuery, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchSiteContent, submitConsultationRequest } from "./mockApi.js";

export function useSiteContent() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ar";

  const query = useQuery({
    queryKey: ["site-content", lang],
    queryFn: () => fetchSiteContent(lang),
    placeholderData: (previousData) => previousData,
  });

  return {
    content: query.data,
    pictures: query.data?.pictures,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
  };
}

export function useSubmitConsultationRequest() {
  return useMutation({
    mutationFn: submitConsultationRequest,
  });
}
