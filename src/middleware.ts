import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route configurations
const routeConfig = {
  public: [
    "/",
    "/login",
    "/register",
    "/tutor-register",
    "/find-tutor",
    "/tutor-info",
    "/blog",
    "/contact",
    "/admin/login",
  ],

  authenticated: [
    "/profile",
    "/my-classes",
    "/payment-result",
  ],

  // Routes that require specific roles
  roleSpecific: {
    tutor: [
      "/class-subcribtion",
    ],
    student: [
      "/class-subcribtion",
    ],
    admin: [
      "/admin/tutor-apply",
      "/admin/blogs",
      "/admin/teachers",
      "/admin/students",
    ],
  },
};

// Helper function to check if path matches any pattern
function matchesPath(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    // Exact match
    if (pathname === pattern) return true;
    // Prefix match for dynamic routes (e.g., /tutor-info/[id])
    if (pathname.startsWith(pattern + "/")) return true;
    return false;
  });
}

// Helper function to get user data from cookie
function getUserFromCookie(request: NextRequest): { token: string | null; role: string | null } {
  // Try to get token from cookie (decode in case it was URL-encoded)
  const rawToken = request.cookies.get("accessToken")?.value;
  const token = rawToken ? decodeURIComponent(rawToken) : null;
  
  const userCookie = request.cookies.get("user")?.value;

  let role: string | null = null;

  if (userCookie) {
    try {
      // Decode the URL-encoded cookie value before parsing
      const decodedUserCookie = decodeURIComponent(userCookie);
      const user = JSON.parse(decodedUserCookie);
      role = user.role || null;
    } catch {
      role = null;
    }
  }

  return { token, role };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { token, role } = getUserFromCookie(request);

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Check if it's a public route
  if (matchesPath(pathname, routeConfig.public)) {
    // If user is already logged in and tries to access login/register, redirect to appropriate page
    if (token && (pathname === "/login" || pathname === "/register" || pathname === "/tutor-register")) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    // If admin is already logged in and tries to access admin login
    if (token && role === "admin" && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/tutor-apply", request.url));
    }
    return NextResponse.next();
  }

  // Check if user is authenticated for protected routes
  if (!token) {
    // Check if it's an admin route
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    // Redirect to login for other protected routes
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-specific routes
  // Admin routes
  if (matchesPath(pathname, routeConfig.roleSpecific.admin)) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // Check if route is accessible by tutor OR student (like /class-subcribtion)
  const isTutorRoute = matchesPath(pathname, routeConfig.roleSpecific.tutor);
  const isStudentRoute = matchesPath(pathname, routeConfig.roleSpecific.student);
  
  if (isTutorRoute || isStudentRoute) {
    // If route is for both roles, allow either
    if (isTutorRoute && isStudentRoute) {
      if (role !== "tutor" && role !== "student") {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
      return NextResponse.next();
    }
    // Tutor-only route
    if (isTutorRoute && role !== "tutor") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    // Student-only route
    if (isStudentRoute && role !== "student") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
  }

  // For general authenticated routes, allow any logged-in user
  if (matchesPath(pathname, routeConfig.authenticated)) {
    return NextResponse.next();
  }

  // Default: allow access
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
