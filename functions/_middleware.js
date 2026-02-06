export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    const { pathname, search, hostname } = url;

    let targetPath = pathname;
    let shouldRedirect = false;

    // 1. Skip HTTPS force for localhost
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    if (!isLocalhost && url.protocol === 'http:') {
        url.protocol = 'https:';
        shouldRedirect = true;
    }

    // 2. Trailing Slash Enforcement (Internal logic)
    const hasExtension = pathname.split('/').pop().includes('.');
    if (!hasExtension && pathname !== '/' && !pathname.endsWith('/')) {
        targetPath = pathname + '/';
        shouldRedirect = true;
    }

    // 3. Consolidated Legacy Redirects (Normalized to end with slash)
    const legacyRedirects = {
        '/features/prayer-wall/': '/features/prayer-requests/',
        '/privacy-policy/': '/privacy/',
        '/contact-us/': '/contact/',
        '/welcome/': '/orientation/',
        '/welcome-1/': '/orientation/',
        '/church-app/check-ins/': '/features/check-ins/',
        '/church-app/giving/': '/features/giving/',
        '/pricing/check-ins-app/': '/pricing/',
        '/sign-in/': '/login/',
    };

    // Check both the current targetPath and normalized versions
    if (legacyRedirects[targetPath]) {
        targetPath = legacyRedirects[targetPath];
        shouldRedirect = true;
    } else if (!targetPath.endsWith('/') && legacyRedirects[targetPath + '/']) {
        targetPath = legacyRedirects[targetPath + '/'];
        shouldRedirect = true;
    }

    if (shouldRedirect) {
        url.pathname = targetPath;
        return Response.redirect(url.toString(), 301);
    }

    return next();
}
