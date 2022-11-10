// import UserType from './user-type.enum';

/**
 * These routes are supposed to be visible to only
 * unauthenticated users. if a user tries to visit these
 * routes after login he should be redirected to home page
 */
export const PublicOnlyRoutes: string[] = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/subaccount-register',
];

/**
 * These routes are publicly visible. meaning we don't
 * care about authentication state for displaying these
 * routes they will be visible no matter the authentication
 * status is.
 */
export const PublicRoutes: string[] = [];

/**
 * These routes are supposed to be accessible by logged in
 * users without selecting the current company. Unlike other
 * routes, these routes must match exactly to the target route
 */
export const PrivateRoutesWithoutCurrentCompany: string[] = [
  '/create-company',
  '/user',
  '/user/edit',
];

/**
 * After login user should select company first. This is that
 * route.
 */
export const CompanySelectionRoute = '/select-company';

/**
 * After company selection, user should be redirected to this
 * route. It will also be used as a common redirection route
 * for other common redirection scenario.
 */
export const UserDashboard = '/';

/**
 * Admin user should always be under this route.
 */
export const AdminDashboard = '/admin';

/**
 * Admin routes should start with this prefix.
 */
export const AdminRoutesPrefix = '/admin';

/**
 * Unauthenticated users will be redirected to this route
 */
export const LoginRoute = '/login';

/**
 * This route will be rendered to logout from current session
 */
export const LogoutRoute = '/logout';

/**
 * List of user types who will be considered as admin users
 */
// export const AdminUserTypes: UserType[] = [UserType.Admin, UserType.SuperAdmin];

/**
 * List of routes which subaccount can not access,
 * these routes needs to be exact match with target
 * route.
 */
export const SubaccountBlacklist: string[] = ['/organization/update'];
