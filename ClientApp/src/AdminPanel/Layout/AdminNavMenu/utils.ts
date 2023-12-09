import AdminNavMenuRoute from "./AdminNavMenuRoutes";

/**
 * Combines path with root path of "/admin-panel"
 * @param {AdminNavMenuRoute} subPath - The subpath to combine with the admin root route.
 * @returns {string} - The combined path with the root path of /admin-panel/{subpath}.
 */
const combinePathWithAdminRoot = (subPath: AdminNavMenuRoute): string => {
  const ADMIN_ROOT_ROUTE = "/admin-panel/";
  return ADMIN_ROOT_ROUTE + subPath;
};

export default combinePathWithAdminRoot;
