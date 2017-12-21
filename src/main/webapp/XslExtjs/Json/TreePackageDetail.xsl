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
  <xsl:param name="pType"/>
  <xsl:param name="pName"/>

  <xsl:variable name="user" select="/ROOT/USER"/>
  <xsl:variable name="application" select="$user/PROFILES/PROFILE/APPLICATIONS/APPLICATION"/>
  <xsl:variable name="type" select="$application[@Name=$pApplication]/PACKAGING/PACKAGE[@Type=$pType and @Name=$pName]"/>

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
    ,'text':'<xsl:value-of select="name()"/> ->  [<xsl:value-of select="normalize-space(.)"/>]'
    ,'leaf':'true'}
    <xsl:if test="contains(normalize-space(.), '[') and contains(normalize-space(.), ']')">
    ,
    {'id':'<xsl:value-of select="generate-id()"/>'
    ,'text':'<xsl:value-of select="name()"/> Eval ->  [<xsl:call-template name="replace-application-path">
                 <xsl:with-param name="text" select="normalize-space(.)"/>
              </xsl:call-template>]'
    ,'leaf':'true'}
    </xsl:if>
  </xsl:template>

  <xsl:template match="/">[{'id':'root0', 'text':'<xsl:value-of select="$pName"/>', children:
  [
  	<!--
    {'id':'parameter0', 'text':'parameter',
        children: [
             {'id':'parameter1','text':'application  ->   [<xsl:value-of select="$pApplication"/>]', 'leaf':'true'}
            ,{'id':'parameter2','text':'type  ->  [<xsl:value-of select="$pType"/>]', 'leaf':'true'}
            ,{'id':'parameter3','text':'name  ->  [<xsl:value-of select="$pName"/>]', 'leaf':'true'}
        ]
    },
    -->
    <xsl:for-each select="$type">
    {'id':'attribute0', 'text':'attribute',
        children: [
            <xsl:apply-templates select="@*"/>
        ]
    },
    {'id':'detail0', 'text':'detail',
        children: [
            <xsl:apply-templates/>
        ]
    }
    </xsl:for-each>
  ]
  }]</xsl:template>

</xsl:stylesheet>