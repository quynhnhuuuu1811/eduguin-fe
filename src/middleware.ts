import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

function matchesPath(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    if (pathname === pattern) return true;
    if (pathname.startsWith(pattern + "/")) return true;
    return false;
  });
}

function getUserFromCookie(request: NextRequest): { token: string | null; role: string | null } {
  const rawToken = request.cookies.get("accessToken")?.value;
  const token = rawToken ? decodeURIComponent(rawToken) : null;
  
  const userCookie = request.cookies.get("user")?.value;

  let role: string | null = null;

  if (userCookie) {
    try {
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

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  if (matchesPath(pathname, routeConfig.public)) {
    if (token && (pathname === "/login" || pathname === "/register" || pathname === "/tutor-register")) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    if (token && role === "admin" && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/tutor-apply", request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (matchesPath(pathname, routeConfig.roleSpecific.admin)) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  const isTutorRoute = matchesPath(pathname, routeConfig.roleSpecific.tutor);
  const isStudentRoute = matchesPath(pathname, routeConfig.roleSpecific.student);
  
  if (isTutorRoute || isStudentRoute) {
    if (isTutorRoute && isStudentRoute) {
      if (role !== "tutor" && role !== "student") {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
      return NextResponse.next();
    }
    if (isTutorRoute && role !== "tutor") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    if (isStudentRoute && role !== "student") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
  }

  if (matchesPath(pathname, routeConfig.authenticated)) {
    return NextResponse.next();
  }

  // Default: allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
