import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'kaiee.in'}`);

  // Special case for localhost testing and Cloudflare Pages default domains
  if (hostname === 'localhost:3000' || hostname.endsWith('.pages.dev')) {
    hostname = 'kaiee.in';
  } else if (hostname.includes('localhost')) {
    // If someone uses community.localhost:3000 it becomes community.kaiee.in
    hostname = hostname.replace('localhost:3000', 'kaiee.in');
  }

  // Rewrite to the appropriate domain folder
  // Example: 
  // If hostname is kaiee.in, rewrite to /kaiee.in/path
  // If hostname is community.kaiee.in, rewrite to /community.kaiee.in/path
  
  return NextResponse.rewrite(new URL(`/${hostname}${url.pathname}`, req.url));
}
