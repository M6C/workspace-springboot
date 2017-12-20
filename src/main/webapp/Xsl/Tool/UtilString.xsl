<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xalan="http://xml.apache.org/xalan"
                exclude-result-prefixes="xalan">

    <!-- Remplace 'replace' par 'with' dans 'text' -->
  <xsl:template name="replace-string">
    <xsl:param name="text"/>
    <xsl:param name="replace"/>
    <xsl:param name="with"/>
    <xsl:choose>
      <xsl:when test="contains($text,$replace)">
        <xsl:variable name="lText">
            <xsl:value-of select="concat(concat(substring-before($text,$replace), $with), substring-after($text,$replace))"/>
        </xsl:variable>
        <xsl:call-template name="replace-string">
          <xsl:with-param name="text" select="$lText"/>
          <xsl:with-param name="replace" select="$replace"/>
          <xsl:with-param name="with" select="$with"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

    <!-- Remplace 'replace' par 'with' dans 'text' -->
  <xsl:template name="escape-path-caractere">
    <xsl:param name="text"/>
    <xsl:variable name="lText">
        <xsl:call-template name="replace-string">
          <xsl:with-param name="text" select="$text"/>
          <xsl:with-param name="replace" select="string('\')"/>
          <xsl:with-param name="with" select="string('/')"/>
        </xsl:call-template>
    </xsl:variable>
    <xsl:value-of select="$lText"/>
  </xsl:template>

</xsl:stylesheet>