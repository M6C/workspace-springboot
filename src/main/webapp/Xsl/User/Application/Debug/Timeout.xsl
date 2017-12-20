<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" encoding="ISO-8859-1" indent="no"/>

	<xsl:param name="pApplication"/>

	<xsl:variable name="user" select="/ROOT/USER"/>
	<xsl:variable name="application" select="$user/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name=$pApplication]"/>
	<xsl:variable name="timeout" select="$application/DEBUG/TIMEOUT"/>
	
	<xsl:template match="/">
    <xsl:value-of select="$timeout"/>
	</xsl:template>

</xsl:stylesheet>