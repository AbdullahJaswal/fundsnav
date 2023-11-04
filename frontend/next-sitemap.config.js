/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://fundsnav.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    "/403",
    "/404",
    "/500",
    "/api/*",
    "/backend-api/*",
    "/dashboard",
    "/dashboard/*",
    "/error",
    "/server-sitemap.xml",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.SITE_URL || "https://fundsnav.com"}/server-sitemap.xml`],
  },
};
