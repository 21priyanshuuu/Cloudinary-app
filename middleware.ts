// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isPublicRoute = createRouteMatcher([
//   "/sign-in",
//   "/sign-up",
//   "/",
//   "/home",
// ]);

// const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

// export default clerkMiddleware((auth, req) => {
//   console.log("Cookies:", req.cookies);  // Log the cookies to ensure the session cookie is set
//   const { userId } = auth();        


//   console.log("User ID:", userId);  // Check if userId is being returned
//   const currentUrl = new URL(req.url);
//   const isApiRequest = currentUrl.pathname.startsWith("/api");

//   if (userId && isPublicRoute(req)) {
//     return NextResponse.redirect(new URL("/home", req.url));
//   }

//   if (!userId) {
//     if (!isPublicRoute(req) && !isApiRequest) {
//       return NextResponse.redirect(new URL("/sign-in", req.url));
//     }

//     if (isApiRequest && !isPublicApiRoute(req)) {
//       return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
//         status: 401,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   }

//   return NextResponse.next();
// });


// export const config = {
//   matcher: ["/((?!.*\\..*|_next|static).*)", "/", "/(api|trpc)(.*)"],
// };


import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}