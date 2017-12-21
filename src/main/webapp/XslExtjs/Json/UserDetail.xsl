<!-- validator online: http://jsonlint.com/ -->
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xalan="http://xml.apache.org/xalan"
                xmlns:regexp="http://exslt.org/regular-expressions"
                exclude-result-prefixes="xalan">

<xsl:import href="/Xsl/Tool/UtilString.xsl"/>

<xsl:output method="text" encoding="ISO-8859-1" indent="no"/>

  <xsl:strip-space elements="*"/>

  <xsl:variable name="user" select="/ROOT/USER"/>

  <!-- Copie toutes les balises -->
  <xsl:template match="*">
    {'id':'<xsl:value-of select="concat(name(), generate-id())"/>'
    ,'text':'<xsl:value-of select="name()"/><xsl:apply-templates select="@*"/>'
    ,children: [
	   <xsl:if test="count(child::*) > 0">
          <xsl:apply-templates select="*"/>
	   </xsl:if>
	   <xsl:if test="count(child::*) = 0">
        <xsl:variable name="lText">
            <xsl:call-template name="escape-path-caractere">
              <xsl:with-param name="text" select="normalize-space(.)"/>
            </xsl:call-template>
        </xsl:variable>
	   {'id':'<xsl:value-of select="concat(name(), 'VALUE', generate-id())"/>', 'text':'<xsl:value-of select="$lText"/>', 'leaf':'true'}
	   </xsl:if>
    ]
    }
  	<xsl:if test="not(position()=last())">,</xsl:if>
  </xsl:template>

  <!-- Copie tous les attributs -->
  <xsl:template match="@*">
    <xsl:value-of select="concat(' ',name(), ' : ')"/>"<xsl:value-of select="normalize-space(.)"/>"
  </xsl:template>

  <xsl:template match="/">
  <!-- Variable de resultat -->
  <xsl:variable name="res">
	  [
	    <xsl:for-each select="$user">
	    {'id':'<xsl:value-of select="concat(name(), generate-id())"/>', 'text':'<xsl:value-of select="name()"/><xsl:apply-templates select="@*"/>'
	    <!--, root:'true'-->
	        <xsl:if test="count(child::*) > 0">
	    		<xsl:for-each select="./PROFILES">
		        , children: [
 					<xsl:apply-templates select="*"/>
		         ]
	    		</xsl:for-each>
		    </xsl:if>
	        <xsl:if test="count(child::*) = 0">
	        ,'leaf':'true'
		    </xsl:if>
	    }
	  	<xsl:if test="not(position()=last())">,</xsl:if>
	    </xsl:for-each>
	  ]
  </xsl:variable>
  <!-- Ecrit le contenu de la variable resultat  -->
  <xsl:value-of select="normalize-space($res)"/>
  </xsl:template>

</xsl:stylesheet>