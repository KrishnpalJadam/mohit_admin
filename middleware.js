// ** Next, React And Locals Imports
import { NextResponse } from "next/server";

// ** Third Party Imports
import { jwtVerify } from "jose";

export default async function middleware(req) {
  // Below routes requires no authentication
  const unProtectedRoutes = ["/login"];

  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.includes(".") // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith(unProtectedRoutes[0])) {
    return NextResponse.next();
  } else {
    //Validating protecting routes
    // Jwt Token
    const jwt = req.cookies.get("access_token")?.value;

    // Absolute Url
    req.nextUrl.pathname = "/login";

    // Updating the cookie & redirect
    const updateCookie = () => {
      const response = NextResponse.redirect(req.nextUrl);
      return response;
    };

    // If no token present, redirecting to login page
    if (jwt === undefined) {
      return updateCookie();
    }

    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

    try {
      const { payload } = await jwtVerify(jwt, secret);

      if (payload.role === "customer") {
        return updateCookie();
      } else {
        // Show pages to admins based on admin privileges
        const privileges = payload.privileges;

        const isAllowed = (path) => {
          const pathParts = path.split("/");

          // Allowing superAdmin to access all routes
          if (payload.role === "superAdmin") {
            return true;
          }

          const allowedPaths = privileges.filter((privilege) => {
            const privilegeParts = privilege.split("/");
            if (privilegeParts.length <= pathParts.length) {
              return privilegeParts.every(
                (part, index) => part === pathParts[index]
              );
            }

            return false;
          });

          return allowedPaths.length > 0;
        };

        if (isAllowed(pathname)) {
          return NextResponse.next();
        } else {
          return updateCookie();
        }
      }
    } catch (error) {
      return updateCookie();
    }
  }
}
