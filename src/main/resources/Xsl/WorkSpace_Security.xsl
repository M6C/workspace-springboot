<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" encoding="ISO-8859-1" indent="yes"/>

	<xsl:param name="myID"/>
	<xsl:param name="myPWD"/>

	<xsl:variable name="users" select="ROOT/USERS"/>
	<xsl:variable name="profiles" select="ROOT/PROFILES"/>
	<xsl:variable name="applications" select="ROOT/APPLICATIONS"/>
	<xsl:variable name="jdks" select="ROOT/JDKS"/>
	<xsl:variable name="servers" select="ROOT/SERVERS"/>

	<xsl:variable name="user" select="$users/USER[LOGIN=$myID and PASSWORD=$myPWD]"/>
	<xsl:variable name="profile" select="$profiles/PROFILE"/>
	<xsl:variable name="application" select="$applications/APPLICATION"/>
	<xsl:variable name="paths" select="./PATHS"/>
	<xsl:variable name="path" select="$paths/PATH"/>

	<xsl:variable name="user_prof" select="$user/PROFILES/PROFILE"/>
	<!--
	<xsl:variable name="prof_appl" select="$profile[@Name=$user_prof/@Name]/APPLICATIONS/APPLICATION"/>
	<xsl:variable name="jdk_appl" select="$profile[@Name=$user_prof/@Name]/APPLICATIONS/APPLICATION/JDK"/>
	-->

	<xsl:variable name="jdk" select="$jdks/JDK"/>

	<xsl:variable name="server" select="$servers/SERVER"/>

	<xsl:template match="/">
	<ROOT>
		<xsl:for-each select="$user">
		<USER Name="{@Name}">
			<LOGIN><xsl:value-of select="./LOGIN"/></LOGIN>
			<PASSWORD><xsl:value-of select="./PASSWORD"/></PASSWORD>
			<PROFILES>
				<xsl:for-each select="$profile[@Name=$user_prof/@Name]">
				<xsl:variable name="prof_appl" select="$profile[@Name=current()/@Name]/APPLICATIONS/APPLICATION"/>
				<xsl:variable name="jdk_appl" select="$profile[@Name=current()/@Name]/APPLICATIONS/APPLICATION/JDK"/>
				<PROFILE Name="{@Name}">
					<APPLICATIONS>
						<xsl:for-each select="$application[@Name=$prof_appl/@Name]">
						<APPLICATION Name="{@Name}">
							<xsl:for-each select="*">
				        <xsl:choose>
			      	    <xsl:when test="name(current()) = 'JDK'">
					          <xsl:copy-of select="$jdk[@Name=current()/@Name]"/>
				          </xsl:when>
			      	    <xsl:when test="name(current()) = 'SERVER'">
					          <xsl:copy-of select="$server[@Name=current()/@Name]"/>
				          </xsl:when>
				          <xsl:otherwise>
					          <xsl:copy-of select="current()/."/>
				          </xsl:otherwise>
				        </xsl:choose>
							</xsl:for-each>
						</APPLICATION>
						</xsl:for-each>
					</APPLICATIONS>
				</PROFILE>
				</xsl:for-each>
			</PROFILES>
		</USER>
		</xsl:for-each>
	</ROOT>
	</xsl:template>

</xsl:stylesheet>
