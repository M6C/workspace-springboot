<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- /Xsl/Servlet/ -->
<xsl:import href="FxAddElementParam.xsl"/>


<xsl:output method="xml" encoding="ISO-8859-1" indent="yes"/>

    <xsl:param name="pName"/>
    <xsl:param name="pBeanName"/>
    <xsl:param name="pBeanService"/>
    <xsl:param name="pBeanClass"/>
    <xsl:param name="pBeanScope"/>
    <xsl:param name="pQueryType"/>
    <xsl:param name="pQueryParameterCount"/>
    <xsl:param name="pQuery"/>
    <xsl:param name="pParamName"/>
    <xsl:param name="pParamType"/>
    <xsl:param name="pParamBean"/>
    <xsl:param name="pParamFormatIn"/>

	<!-- Copie toutes les balises -->
	<xsl:template match="*">
		<xsl:element name="{name()}">
			<xsl:apply-templates select="@*"/>
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>

	<!-- Copie tous les attributs -->
	<xsl:template match="@*">
		<xsl:attribute name="{name()}">
			<xsl:value-of select="."/>
		</xsl:attribute>
	</xsl:template>

	<!-- Applique les templates que sur les sous elements de ROOT -->
	<xsl:template match="/ROOT/SERVLET[@Name=$pName]">

		<xsl:element name="SERVLET">

			<xsl:copy-of select="attribute::*"/>
			<xsl:apply-templates select="./BEAN"/>

            <xsl:if test="$pBeanName">
		   		<!-- Ajout de l'element BEAN -->
		    	<xsl:element name="BEAN">
			        <!-- Creer un attribut Name -->
			        <xsl:attribute name="Name">
				        <xsl:value-of select="$pBeanName"/>
			        </xsl:attribute>
			        <!-- Creer un attribut Service -->
		            <xsl:if test="$pBeanService">
				        <xsl:attribute name="Service">
					        <xsl:value-of select="$pBeanService"/>
				        </xsl:attribute>
		            </xsl:if>
			        <!-- Creer un attribut Class -->
		            <xsl:if test="$pBeanClass">
				        <xsl:attribute name="Class">
					        <xsl:value-of select="$pBeanClass"/>
				        </xsl:attribute>
		            </xsl:if>
			        <!-- Creer un attribut Scope -->
		            <xsl:if test="$pBeanScope">
				        <xsl:attribute name="Scope">
					        <xsl:value-of select="$pBeanScope"/>
				        </xsl:attribute>
		            </xsl:if>
			        <!-- Creer un attribut Class -->
		            <xsl:if test="$pBeanClass">
				        <xsl:attribute name="Class">
					        <xsl:value-of select="$pBeanClass"/>
				        </xsl:attribute>
		            </xsl:if>
		            <xsl:if test="$pQuery">
				   		<!-- Ajout de l'element QUERY -->
				    	<xsl:element name="QUERY">
					        <!-- Creer un attribut Type -->
					        <xsl:if test="$pQueryType">
						        <xsl:attribute name="Type">
							        <xsl:value-of select="$pQueryType"/>
						        </xsl:attribute>
					        </xsl:if>
					        <!-- Creer un attribut ParameterCount -->
					        <xsl:if test="$pQueryParameterCount">
						        <xsl:attribute name="ParameterCount">
							        <xsl:value-of select="$pQueryParameterCount"/>
						        </xsl:attribute>
					        </xsl:if>
					        <xsl:value-of select="$pQuery"/>
				    	</xsl:element>
		            </xsl:if>
		            <xsl:if test="$pParamName">
			            <xsl:if test="$pParamType">
							<xsl:call-template name="fxAddElementParam">
							        <xsl:with-param name="names" select="$pParamName"/>
							        <xsl:with-param name="types" select="$pParamType"/>
							        <xsl:with-param name="beans" select="$pParamBean"/>
							        <xsl:with-param name="formats" select="pParamFormatIn"/>
							</xsl:call-template>
			            </xsl:if>
		            </xsl:if>
		    	</xsl:element>
            </xsl:if>
		</xsl:element>

    </xsl:template>
</xsl:stylesheet>