import { handleOAuthCallback } from '../../../../../../lib/social';
import { prisma } from '../../../../../../lib/db/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/settings?error=oauth_denied', request.url));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL('/settings?error=invalid_callback', request.url));
  }

  try {
    const [userId, platform] = state.split(':');
    if (!userId || platform !== 'YOUTUBE_SHORTS') {
      throw new Error('Invalid state');
    }

    const result = await handleOAuthCallback('YOUTUBE_SHORTS', code, state);

    await prisma.socialAccount.upsert({
      where: {
        userId_platform_accountId: {
          userId,
          platform: 'YOUTUBE_SHORTS',
          accountId: result.accountId,
        },
      },
      update: {
        accountName: result.accountName,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        tokenExpiresAt: result.expiresAt,
        scopes: result.scopes,
        isActive: true,
      },
      create: {
        userId,
        platform: 'YOUTUBE_SHORTS',
        accountId: result.accountId,
        accountName: result.accountName,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        tokenExpiresAt: result.expiresAt,
        scopes: result.scopes,
      },
    });

    return NextResponse.redirect(new URL('/settings?connected=youtube', request.url));
  } catch (err) {
    console.error('YouTube OAuth error:', err);
    return NextResponse.redirect(new URL('/settings?error=oauth_failed', request.url));
  }
}
