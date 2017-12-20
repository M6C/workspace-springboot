<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xalan="http://xml.apache.org/xalan"
                exclude-result-prefixes="xalan">

<!-- /Xsl/User/Application/Util/ -->
<!-- xsl:import href="../../Util/UtilFormatPath.xsl"/ -->
<xsl:import href="/Xsl/User/Application/Util/UtilFormatPath.xsl"/>

<xsl:output method="text" encoding="ISO-8859-1" indent="no"/>

	<xsl:param name="pApplication"/>
	<xsl:param name="pPath"/>

	<xsl:variable name="user" select="/ROOT/USER"/>
	<xsl:variable name="application" select="$user/PROFILES/PROFILE/APPLICATIONS/APPLICATION"/>
	<xsl:variable name="path" select="$application[@Name=$pApplication]/PATHS/PATH[@Name=$pPath]"/>
	
	<xsl:template match="/">

	<xsl:call-template name="replace-application-path">
       <xsl:with-param name="text" select="$path"/>
    </xsl:call-template>

	</xsl:template>

</xsl:stylesheet>
