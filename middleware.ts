import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Update the session first
  const response = await updateSession(request);

  // Check if the timezone cookie already exists
  const timezoneCookie = request.cookies.get('timezone');

  // If the timezone cookie doesn't exist, set it
  if (!timezoneCookie) {
    // Retrieve the client's timezone using 'Intl.DateTimeFormat'
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log("timezone", timezone);

    // Set the timezone cookie with the appropriate options
    response.cookies.set('timezone', timezone, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 2,
    });
  }

  // Return the modified response
  return response;
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
