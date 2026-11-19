import { NextResponse, type NextRequest } from 'next/server';
import { privateHeaders } from '@/lib/server/personal-response';
import { limitReportWork } from '@/lib/server/report-rate-limit';

export function proxy(request: NextRequest) {
  const retryAfter = limitReportWork('report', request.headers);
  if (retryAfter) {
    return new NextResponse('Too many reading requests. Please try again shortly.', {
      status: 429,
      headers: { ...privateHeaders, 'Retry-After': String(retryAfter) },
    });
  }
  return NextResponse.next();
}

export const config = { matcher: '/report/:date' };
