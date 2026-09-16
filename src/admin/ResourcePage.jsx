import { useParams, Navigate } from "react-router-dom";
import { getResource } from "../../shared/resources.js";
import { CollectionAdminPage } from "./generic/CollectionAdminPage.jsx";
import { SingletonAdminPage } from "./generic/SingletonAdminPage.jsx";

export function ResourcePage() {
  const { resourceKey } = useParams();
  const resource = getResource(resourceKey);

  if (!resource) return <Navigate to="/admin/services" replace />;

  return resource.mode === "collection" ? (
    <CollectionAdminPage key={resource.key} resource={resource} />
  ) : (
    <SingletonAdminPage key={resource.key} resource={resource} />
  );
}
