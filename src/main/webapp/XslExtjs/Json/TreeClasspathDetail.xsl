<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xalan="http://xml.apache.org/xalan"
                exclude-result-prefixes="xalan">

<!-- /Xsl/User/Application/Util/ -->
<!-- xsl:import href="../../Xsl/User/Application/Util/UtilFormatPath.xsl"/-->
<xsl:import href="/Xsl/User/Application/Util/UtilFormatPath.xsl"/>


<xsl:output method="text" encoding="ISO-8859-1" indent="no"/>

  <xsl:strip-space elements="*"/>

  <xsl:param name="pApplication"/>



  <xsl:variable name="user" select="/ROOT/USER"/>
  <xsl:variable name="application" select="$user/PROFILES/PROFILE/APPLICATIONS/APPLICATION"/>
  <xsl:variable name="classpath" select="$application[@Name=$pApplication]/BUILD/CLASSPATH"/>

  <!-- Copie toutes les balises -->
  <xsl:template match="*">
  	<xsl:if test="position()>1">,</xsl:if>
    {'id':'<xsl:value-of select="generate-id()"/>'
    ,'text':'<xsl:value-of select="name()"/>'
    ,children: [
            <xsl:apply-templates select="@*"/>
            <xsl:apply-templates/>
        ]
    }
  </xsl:template>

  <!-- Copie tous les attributs -->
  <xsl:template match="@*">
  	<xsl:if test="position()>1">,</xsl:if>
    {'id':'<xsl:value-of select="generate-id()"/>'
    ,'text':'<xsl:value-of select="name()"/>  ->  [<xsl:value-of select="normalize-space(.)"/>]'
    ,'leaf':'true'}
  </xsl:template>

  <xsl:template match="/">[{'id':'root0', 'text':'<xsl:value-of select="$pApplication"/>', children:
  [
    <xsl:for-each select="$classpath">
    <xsl:if test="position()>1">,</xsl:if>
    {'id':'attribute<xsl:value-of select="generate-id()"/>', 'text':'<xsl:value-of select="name()"/>',
        children: [
            <xsl:apply-templates select="@*"/>
            ,
	        {
	        'id':'<xsl:value-of select="generate-id()"/>'
		    ,'text':'Value -> <xsl:apply-templates/>'
		    ,'leaf':'true'
		    }
        <xsl:choose>
          <xsl:when test="@Type='Path'">
            ,
	        {
	        'id':'<xsl:value-of select="generate-id()"/>_EVAL'
          	,'text':
            'Value Eval -> <xsl:call-template name="replace-application-path">
                 <xsl:with-param name="text" select="current()"/>
              </xsl:call-template>'
		    ,'leaf':'true'
		    }
          </xsl:when>
        </xsl:choose>
        ]
    }
    </xsl:for-each>
  ]
  }]</xsl:template>

</xsl:stylesheet>