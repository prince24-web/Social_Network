export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/settings/', '/onboarding/', '/challenge/'],
        },
        sitemap: 'https://devduel.space/sitemap.xml',
    }
}
