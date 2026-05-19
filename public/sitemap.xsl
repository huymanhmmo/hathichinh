<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Sitemap – Ths. Bs. Hà Thị Chinh</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #334155;
            background-color: #f8fafc;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #fff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          }
          h1 {
            color: #0f172a;
            font-size: 28px;
            margin-bottom: 8px;
            font-weight: 700;
          }
          p.desc {
            color: #64748b;
            margin-bottom: 30px;
            font-size: 16px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            text-align: left;
            padding: 12px 16px;
            background: #f1f5f9;
            color: #475569;
            font-weight: 600;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid #f1f5f9;
            word-break: break-all;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          a {
            color: #0ea5e9;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
          }
          .priority-high { background: #dcfce7; color: #166534; }
          .priority-med { background: #fef9c3; color: #854d0e; }
          .priority-low { background: #f1f5f9; color: #475569; }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Sitemap (Sơ đồ trang web)</h1>
          <p class="desc">
            Đây là danh sách các trang công khai trên website <strong>hathichinh.com</strong> được tối ưu cho các công cụ tìm kiếm như Google, Bing.
          </p>
          
          <table>
            <thead>
              <tr>
                <th width="50%">URL</th>
                <th width="15%">Ngôn ngữ</th>
                <th width="15%">Độ ưu tiên</th>
                <th width="20%">Cập nhật cuối</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <!-- Logic để chèn tiêu đề nhóm ngôn ngữ khi thay đổi -->
                <xsl:variable name="currentUrl" select="sitemap:loc"/>
                <xsl:variable name="prevUrl" select="preceding-sibling::sitemap:url[1]/sitemap:loc"/>
                
                <xsl:variable name="currentLang">
                  <xsl:choose>
                    <xsl:when test="contains($currentUrl, '/vi')">Tiếng Việt (VI)</xsl:when>
                    <xsl:when test="contains($currentUrl, '/en')">English (EN)</xsl:when>
                    <xsl:otherwise>Chung</xsl:otherwise>
                  </xsl:choose>
                </xsl:variable>

                <xsl:variable name="prevLang">
                  <xsl:choose>
                    <xsl:when test="contains($prevUrl, '/vi')">Tiếng Việt (VI)</xsl:when>
                    <xsl:when test="contains($prevUrl, '/en')">English (EN)</xsl:when>
                    <xsl:otherwise>Chung</xsl:otherwise>
                  </xsl:choose>
                </xsl:variable>

                <xsl:if test="$currentLang != $prevLang or position() = 1">
                  <tr>
                    <td colspan="4" style="background: #f8fafc; font-weight: 700; color: #0ea5e9; padding: 20px 16px 10px 16px;">
                      <xsl:value-of select="$currentLang"/>
                    </td>
                  </tr>
                </xsl:if>

                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td>
                    <xsl:for-each select="xhtml:link">
                        <span style="margin-right: 5px; color: #64748b; font-size: 11px;">
                            <xsl:value-of select="@hreflang"/>
                        </span>
                    </xsl:for-each>
                  </td>
                  <td>
                    <xsl:variable name="priority" select="sitemap:priority"/>
                    <span class="badge">
                      <xsl:attribute name="class">
                        <xsl:choose>
                          <xsl:when test="$priority &gt;= 0.8">badge priority-high</xsl:when>
                          <xsl:when test="$priority &gt;= 0.5">badge priority-med</xsl:when>
                          <xsl:otherwise>badge priority-low</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td>
                    <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          
          <div class="footer">
            Generated by Next.js SEO Engine | &#169; 2026 Ths. Bs. Hà Thị Chinh
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
