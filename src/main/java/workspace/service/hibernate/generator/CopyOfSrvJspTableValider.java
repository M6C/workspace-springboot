// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   CopyOfSrvJspTableValider.java

package workspace.service.hibernate.generator;

import framework.beandata.BeanFindList;
import framework.beandata.BeanGenerique;
import framework.convoyeur.CvrData;
import framework.convoyeur.CvrField;
import framework.ressource.FrmWrkServlet;
import framework.ressource.bean.BeanData;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.*;
import java.util.*;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import javax.xml.parsers.*;
import javax.xml.transform.TransformerException;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import workspace.adaptateur.AdpXmlHibernate;
import workspace.adaptateur.AdpXmlServlet;
import workspace.adaptateur.bean.*;
import workspace.util.UtilPath;

public class CopyOfSrvJspTableValider extends SrvGenerique
{

    public CopyOfSrvJspTableValider()
    {
        hbnTableName = new Hashtable();
        hbnFileName = new Hashtable();
        hbnClassByTable = new Hashtable();
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        try
        {
            Document dom = (Document)session.getAttribute("resultDom");
            String destination = (String)bean.getParameterDataByName("destination");
            String schema = (String)bean.getParameterDataByName("schema");
            Integer cbxCount = (Integer)bean.getParameterDataByName("cbxCount");
            Integer modelCount = (Integer)bean.getParameterDataByName("modelCount");
            String xml = (String)bean.getParameterDataByName("xml");
            String xmldestination = (String)bean.getParameterDataByName("xmldestination");
            if(UtilString.isNotEmpty(destination) && UtilString.isNotEmpty(schema) && UtilString.isNotEmpty(xml) && UtilString.isNotEmpty(xmldestination) && cbxCount != null && cbxCount.intValue() > 0)
            {
                File fXml = new File(UtilPath.formatPath(dom, xml));
                File fXmlDestination = new File(UtilPath.formatPath(dom, xmldestination));
                File fDestination = new File(UtilPath.formatPath(dom, destination));
                if(fXml.exists() && fDestination.exists())
                {
                    DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
                    DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
                    Document resultDom = docBuilder.parse(fXml);
                    request.setAttribute("schema", schema);
                    int iModelCount = modelCount.intValue();
                    for(int i = 0; i < iModelCount; i++)
                        resultDom = writeTableColumn(request, response, resultDom, bean, i);

                    if(resultDom != null)
                        UtilXML.writeXml(new File(fXmlDestination, fXml.getName()), resultDom);
                }
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
            System.out.println(ex.getMessage());
        }
    }

    protected Document writeTableColumn(HttpServletRequest request, HttpServletResponse response, Document resultDom, BeanGenerique bean, int cnt)
        throws FileNotFoundException, IOException, ParserConfigurationException, SAXException, TransformerException
    {
        HttpSession session = request.getSession();
        Document dom = (Document)session.getAttribute("resultDom");
        ServletContext context = session.getServletContext();
        String destination = (String)bean.getParameterDataByName("destination");
        String xmlpathtarget = (String)bean.getParameterDataByName("xmlpathtarget");
        String model = request.getParameter((new StringBuilder("model")).append(cnt).toString());
        String destName = request.getParameter((new StringBuilder("destName")).append(cnt).toString());
        String modelIns = request.getParameter((new StringBuilder("modelIns")).append(cnt).toString());
        String modelUpd = request.getParameter((new StringBuilder("modelUpd")).append(cnt).toString());
        String modelLst = request.getParameter((new StringBuilder("modelLst")).append(cnt).toString());
        String modelSel = request.getParameter((new StringBuilder("modelSel")).append(cnt).toString());
        String modelDel = request.getParameter((new StringBuilder("modelDel")).append(cnt).toString());
        String schema = (String)bean.getParameterDataByName("schema");
        String hbnpath = (String)bean.getParameterDataByName("hbnpath");
        Integer cbxCount = (Integer)bean.getParameterDataByName("cbxCount");
        boolean bModelIns = (new Boolean("on".equals(modelIns))).booleanValue();
        boolean bModelUpd = (new Boolean("on".equals(modelUpd))).booleanValue();
        boolean bModelLst = (new Boolean("on".equals(modelLst))).booleanValue();
        boolean bModelSel = (new Boolean("on".equals(modelSel))).booleanValue();
        boolean bModelDel = (new Boolean("on".equals(modelDel))).booleanValue();
        int iCbxCount = cbxCount.intValue();
        String szTxtTableNameFk = null;
        File fDestination = new File(UtilPath.formatPath(dom, destination));
        String szPathTableFile;
        if(UtilString.isNotEmpty(xmlpathtarget))
            szPathTableFile = xmlpathtarget;
        else
            szPathTableFile = destination.substring(destination.indexOf('/'));
        if(!szPathTableFile.endsWith("/"))
            szPathTableFile = (new StringBuilder(String.valueOf(szPathTableFile))).append("/").toString();
        if(UtilString.isNotEmpty(model))
        {
            File fModel = new File(UtilPath.formatPath(dom, model));
            model = UtilFile.read(fModel);
        } else
        {
            model = "<%@ taglib uri='Framework_Taglib_Html.tld' prefix='html' %>\r\n" + "<html>\r\n<head>\r\n<title>{TABLE_NAME}</title>\r\n</head>\r\n" + "<body>\r\n<table>\r\n<tr><td>{FORM_FIELD}</td></tr>\r\n" + "<tr><td>{TABLE_FOREIGN_KEY_LINK}</td></tr>\r\n</table>\r\n</body>\r\n" + "</html>";
        }
        iniHbnClass(dom, context, hbnpath);
        List listLoopColumn = UtilString.extractPart(model, "{LOOP_COLUMN_BEGIN", "}", "{LOOP_COLUMN_END", "}");
        List listLoopColumnText = null;
        List listLoopPk = UtilString.extractPart(model, "{LOOP_PRIMARY_KEY_BEGIN", "}", "{LOOP_PRIMARY_KEY_END", "}");
        List listLoopPkText = null;
        List listLoopFk = UtilString.extractPart(model, "{LOOP_FOREIGN_KEY_BEGIN", "}", "{LOOP_FOREIGN_KEY_END", "}");
        List listLoopFkText = null;
        for(int i = 1; i <= iCbxCount; i++)
        {
            String szCbxTable = request.getParameter((new StringBuilder("cbxTable")).append(i).toString());
            if(UtilString.isEqualsIgnoreCase(szCbxTable, "on"))
            {
                String szTxtTableName = request.getParameter((new StringBuilder("txtTableName")).append(i).toString());
                if(UtilString.isNotEmpty(szTxtTableName))
                {
                    String szBeanListName = (new StringBuilder("beanList")).append(szTxtTableName).toString();
                    String szBeanItemName = (new StringBuilder("beanItem")).append(szTxtTableName).toString();
                    String szBeanExecName = (new StringBuilder("beanExec")).append(szTxtTableName).toString();
                    listLoopColumnText = new Vector();
                    for(int j = 0; j < listLoopColumn.size(); j++)
                        listLoopColumnText.add("");

                    listLoopPkText = new Vector();
                    for(int j = 0; j < listLoopPk.size(); j++)
                        listLoopPkText.add("");

                    listLoopFkText = new Vector();
                    for(int j = 0; j < listLoopFk.size(); j++)
                        listLoopFkText.add("");

                    String szTxtClassName = classNameByTable(dom, context, hbnpath, szTxtTableName);
                    if(UtilString.isEmpty(szTxtClassName))
                        szTxtClassName = szTxtTableName;
                    String szEventLst = (new StringBuilder(String.valueOf(schema))).append(szTxtTableName).append("Lst").toString();
                    String szEventSel = (new StringBuilder(String.valueOf(schema))).append(szTxtTableName).append("Sel").toString();
                    String szEventAdd = (new StringBuilder(String.valueOf(schema))).append(szTxtTableName).append("Add").toString();
                    String szEventUpd = (new StringBuilder(String.valueOf(schema))).append(szTxtTableName).append("Upd").toString();
                    String szEventDel = (new StringBuilder(String.valueOf(schema))).append(szTxtTableName).append("Del").toString();
                    String szItemName = (new StringBuilder(String.valueOf(schema))).append(szTxtTableName).toString();
                    request.setAttribute("table", szTxtTableName);
                    BeanFindList beanColumnList = (BeanFindList)loadBean(request, response, "beanColumnList");
                    if(beanColumnList != null)
                    {
                        StringBuffer sbSqlPkHbn = new StringBuffer();
                        StringBuffer sbSqlPkSql = new StringBuffer();
                        int iSqlPk = 0;
                        StringBuffer sbSqlCol = new StringBuffer();
                        StringBuffer sbSqlUpd = new StringBuffer();
                        StringBuffer sbSqlInsCol = new StringBuffer();
                        StringBuffer sbSqlInsVal = new StringBuffer();
                        String paramName = "";
                        String paramType = "";
                        String paramNamePk = "";
                        String paramTypePk = "";
                        String paramNameIns = "";
                        String paramTypeIns = "";
                        String paramHrefPk = "";
                        int iSqlCol = 0;
                        int iSqlUpd = 0;
                        int iSqlIns = 0;
                        Long lMaxLength = null;
                        for(int j = 0; j < beanColumnList.getSize().intValue(); j++)
                        {
                            CvrData cvr = (CvrData)UtilSafe.safeListGetElementAt(beanColumnList, j);
                            String szColumnName = (String)((CvrField)cvr.get("COLUMN_NAME")).getData();
                            lMaxLength = (Long)((CvrField)cvr.get("CHARACTER_MAXIMUM_LENGTH")).getData();
                            String szNullable = (String)((CvrField)cvr.get("IS_NULLABLE")).getData();
                            String szDefault = (String)((CvrField)cvr.get("COLUMN_DEFAULT")).getData();
                            String szKey = (String)((CvrField)cvr.get("COLUMN_KEY")).getData();
                            String szExtra = (String)((CvrField)cvr.get("EXTRA")).getData();
                            if(UtilString.isEqualsIgnoreCase(szKey, "PRI"))
                            {
                                String szFieldName = idNameByColumn(dom, szTxtTableName, szColumnName);
                                if(iSqlPk > 0)
                                {
                                    sbSqlPkHbn.append(" AND");
                                    sbSqlPkSql.append(" AND");
                                }
                                sbSqlPkHbn.append(" ").append(szFieldName).append(" = :").append(szFieldName);
                                sbSqlPkSql.append(" ").append(szColumnName).append(" = ?");
                                iSqlPk++;
                                paramNamePk = (new StringBuilder(String.valueOf(paramNamePk))).append(szFieldName).append(";").toString();
                                paramTypePk = (new StringBuilder(String.valueOf(paramTypePk))).append("INTEGER;").toString();
                                paramHrefPk = (new StringBuilder(String.valueOf(paramHrefPk))).append(szFieldName).append("=#R$").append(szItemName).append(".").append(szFieldName).append("#&").toString();
                                for(int k = 0; k < listLoopPk.size(); k++)
                                {
                                    String txt = (String)listLoopPk.get(k);
                                    txt = UtilString.replaceAll(txt, "{COLUMN_NAME}", szFieldName);
                                    txt = (new StringBuilder(String.valueOf((String)listLoopPkText.get(k)))).append(txt).toString();
                                    listLoopPkText.remove(k);
                                    listLoopPkText.add(k, txt);
                                }

                            } else
                            {
                                String szFieldName = fieldNameByColumn(dom, szTxtTableName, szColumnName);
                                if(iSqlCol > 0)
                                    sbSqlCol.append(" ,");
                                sbSqlCol.append(" ").append(szColumnName);
                                iSqlCol++;
                                if(iSqlUpd > 0)
                                    sbSqlUpd.append(" ,");
                                sbSqlUpd.append(" ").append(szColumnName).append(" = ?");
                                iSqlUpd++;
                                if(iSqlIns > 0)
                                {
                                    sbSqlInsCol.append(" ,");
                                    sbSqlInsVal.append(" ,");
                                }
                                sbSqlInsCol.append(" ").append(szColumnName);
                                sbSqlInsVal.append(" ?");
                                paramName = (new StringBuilder(String.valueOf(paramName))).append(szFieldName).append(";").toString();
                                paramType = (new StringBuilder(String.valueOf(paramType))).append("STRING;").toString();
                                iSqlIns++;
                                if(UtilString.isEqualsIgnoreCase(szKey, "MUL"))
                                {
                                    if(UtilString.isNotEmpty(szTxtTableNameFk))
                                    {
                                        for(int k = 0; k < listLoopFk.size(); k++)
                                        {
                                            String txt = (String)listLoopFk.get(k);
                                            txt = UtilString.replaceAll(txt, "{COLUMN_NAME}", szFieldName);
                                            txt = UtilString.replaceAll(txt, "{TABLE_NAME_FK}", szTxtTableNameFk);
                                            txt = (new StringBuilder(String.valueOf((String)listLoopFkText.get(k)))).append(txt).toString();
                                            listLoopFkText.remove(k);
                                            listLoopFkText.add(k, txt);
                                        }

                                    }
                                } else
                                {
                                    for(int k = 0; k < listLoopColumn.size(); k++)
                                    {
                                        String txt = (String)listLoopColumn.get(k);
                                        txt = UtilString.replaceAll(txt, "{COLUMN_NAME}", szFieldName);
                                        txt = (new StringBuilder(String.valueOf((String)listLoopColumnText.get(k)))).append(txt).toString();
                                        listLoopColumnText.remove(k);
                                        listLoopColumnText.add(k, txt);
                                    }

                                }
                            }
                        }

                        paramNameIns = paramName;
                        paramTypeIns = paramType;
                        paramName = (new StringBuilder(String.valueOf(paramName))).append(paramNamePk).toString();
                        paramType = (new StringBuilder(String.valueOf(paramType))).append(paramTypePk).toString();
                        if(!paramName.equals(""))
                            paramName = paramName.substring(0, paramName.length() - 1);
                        if(!paramType.equals(""))
                            paramType = paramType.substring(0, paramType.length() - 1);
                        if(!paramNamePk.equals(""))
                            paramNamePk = paramNamePk.substring(0, paramNamePk.length() - 1);
                        if(!paramTypePk.equals(""))
                            paramTypePk = paramTypePk.substring(0, paramTypePk.length() - 1);
                        if(!paramNameIns.equals(""))
                            paramNameIns = paramNameIns.substring(0, paramNameIns.length() - 1);
                        if(!paramTypeIns.equals(""))
                            paramTypeIns = paramTypeIns.substring(0, paramTypeIns.length() - 1);
                        if(!paramHrefPk.equals(""))
                            paramHrefPk = paramHrefPk.substring(0, paramHrefPk.length() - 1);
                        String html = model.toString();
                        for(int k = 0; k < listLoopColumn.size(); k++)
                        {
                            String col = (String)listLoopColumn.get(k);
                            String txt = (String)listLoopColumnText.get(k);
                            html = UtilString.replaceAll(html, col, txt);
                        }

                        for(int k = 0; k < listLoopPk.size(); k++)
                        {
                            String col = (String)listLoopPk.get(k);
                            String txt = (String)listLoopPkText.get(k);
                            html = UtilString.replaceAll(html, col, txt);
                        }

                        html = UtilString.replaceAll(html, "{SCHEMA}", schema);
                        html = UtilString.replaceAll(html, "{TABLE_NAME}", szTxtTableName);
                        html = UtilString.replaceAll(html, "{EVENT_LST}", szEventLst);
                        html = UtilString.replaceAll(html, "{EVENT_SEL}", szEventSel);
                        html = UtilString.replaceAll(html, "{EVENT_ADD}", szEventAdd);
                        html = UtilString.replaceAll(html, "{EVENT_UPD}", szEventUpd);
                        html = UtilString.replaceAll(html, "{EVENT_DEL}", szEventDel);
                        html = UtilString.replaceAll(html, "{BEAN_LIST}", szBeanListName);
                        html = UtilString.replaceAll(html, "{BEAN_LIST_ITEM}", szItemName);
                        html = UtilString.replaceAll(html, "{BEAN_ITEM}", szBeanItemName);
                        html = UtilString.replaceAll(html, "{HREF_PK}", paramHrefPk);
                        html = UtilString.replaceAll(html, "{LOOP_COLUMN_BEGIN", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_COLUMN_END", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_PRIMARY_KEY_BEGIN", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_PRIMARY_KEY_END", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_FOREIGN_KEY_BEGIN", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_FOREIGN_KEY_END", "}", "");
                        String szTxtTableFile = UtilString.replaceAll(destName, "{SCHEMA}", schema);
                        szTxtTableFile = UtilString.replaceAll(destName, "{TABLE_NAME}", szTxtTableName);
                        UtilFile.write(new File(fDestination, szTxtTableFile), html);
                        if(resultDom != null)
                            try
                            {
                                String szQuery = null;
                                BeanAdpXmlQuery beanAdpXmlQuery = null;
                                BeanAdpXmlBean beanAdpXmlBeanGlobal = null;
                                BeanAdpXmlBean beanAdpXmlBean = null;
                                BeanAdpXmlServlet beanAdpXmlServlet = null;
                                if(bModelLst)
                                {
                                    szQuery = (new StringBuilder("FROM ")).append(szTxtClassName).toString();
                                    beanAdpXmlQuery = new BeanAdpXmlQuery("HIBERNATE", szQuery, "0");
                                    beanAdpXmlBeanGlobal = new BeanAdpXmlBean(szBeanListName, "framework.service.SrvFindList", "framework.beandata.BeanFindList", "request", beanAdpXmlQuery, null, null);
                                    resultDom = AdpXmlServlet.addBeanDom(context, resultDom, beanAdpXmlBeanGlobal);
                                    beanAdpXmlBean = new BeanAdpXmlBean(szBeanListName, null, null, null, null, null, null);
                                    beanAdpXmlServlet = new BeanAdpXmlServlet(szEventLst, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                    resultDom = AdpXmlServlet.addServletDom(context, resultDom, beanAdpXmlServlet);
                                    beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                    beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                }
                                if(bModelSel)
                                {
                                    szQuery = (new StringBuilder("FROM ")).append(szTxtClassName).toString();
                                    if(iSqlPk > 0)
                                        szQuery = (new StringBuilder(String.valueOf(szQuery))).append(" WHERE").append(sbSqlPkHbn.toString()).toString();
                                    beanAdpXmlQuery = new BeanAdpXmlQuery("HIBERNATE", szQuery, Integer.toString(iSqlPk));
                                    beanAdpXmlBean = new BeanAdpXmlBean(szBeanItemName, "framework.service.SrvFindData", "framework.beandata.BeanFindData", "request", beanAdpXmlQuery, paramNamePk, paramTypePk);
                                    beanAdpXmlServlet = new BeanAdpXmlServlet(szEventSel, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                    resultDom = AdpXmlServlet.addServletDom(context, resultDom, beanAdpXmlServlet);
                                    resultDom = AdpXmlServlet.addServletBeanGlobalDom(context, resultDom, beanAdpXmlServlet, beanAdpXmlBeanGlobal);
                                    beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                    beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                }
                                if(bModelIns)
                                {
                                    szQuery = (new StringBuilder("INSERT INTO ")).append(szTxtTableName).append(" (").append(sbSqlInsCol.toString()).append(") VALUES (").append(sbSqlInsVal.toString()).append(")").toString();
                                    beanAdpXmlQuery = new BeanAdpXmlQuery("EXECUTE", szQuery, Integer.toString(iSqlIns));
                                    beanAdpXmlBean = new BeanAdpXmlBean(szBeanExecName, "framework.service.SrvDatabase", "framework.beandata.BeanFindData", "request", beanAdpXmlQuery, paramNameIns, paramTypeIns);
                                    beanAdpXmlServlet = new BeanAdpXmlServlet(szEventAdd, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                    resultDom = AdpXmlServlet.addServletDom(context, resultDom, (BeanAdpXmlServlet)beanAdpXmlServlet.clone(szEventAdd));
                                    resultDom = AdpXmlServlet.addServletBeanGlobalDom(context, resultDom, beanAdpXmlServlet, beanAdpXmlBeanGlobal);
                                    beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                    beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                }
                                if(iSqlPk > 0)
                                {
                                    if(bModelDel)
                                    {
                                        szQuery = (new StringBuilder("DELETE FROM ")).append(szTxtTableName).append(" WHERE").append(sbSqlPkSql.toString()).toString();
                                        beanAdpXmlQuery = new BeanAdpXmlQuery("EXECUTE", szQuery, Integer.toString(iSqlPk));
                                        beanAdpXmlBean = new BeanAdpXmlBean(szBeanExecName, "framework.service.SrvDatabase", "framework.beandata.BeanFindData", "request", beanAdpXmlQuery, paramNamePk, paramTypePk);
                                        beanAdpXmlServlet = new BeanAdpXmlServlet(szEventDel, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                        resultDom = AdpXmlServlet.addServletDom(context, resultDom, (BeanAdpXmlServlet)beanAdpXmlServlet.clone(szEventDel));
                                        resultDom = AdpXmlServlet.addServletBeanGlobalDom(context, resultDom, beanAdpXmlServlet, beanAdpXmlBeanGlobal);
                                        beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                        beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                    }
                                    if(bModelUpd)
                                    {
                                        szQuery = (new StringBuilder("UPDATE ")).append(szTxtClassName).append(" SET ").append(sbSqlUpd.toString()).append(" WHERE").append(sbSqlPkSql.toString()).toString();
                                        beanAdpXmlQuery = new BeanAdpXmlQuery("EXECUTE", szQuery, Integer.toString(iSqlIns + iSqlPk));
                                        beanAdpXmlBean = new BeanAdpXmlBean(szBeanExecName, "framework.service.SrvDatabase", "framework.beandata.BeanFindData", "request", beanAdpXmlQuery, paramName, paramType);
                                        beanAdpXmlServlet = new BeanAdpXmlServlet(szEventUpd, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                        resultDom = AdpXmlServlet.addServletDom(context, resultDom, (BeanAdpXmlServlet)beanAdpXmlServlet.clone(szEventUpd));
                                        resultDom = AdpXmlServlet.addServletBeanGlobalDom(context, resultDom, beanAdpXmlServlet, beanAdpXmlBeanGlobal);
                                        beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                        beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                    }
                                }
                            }
                            catch(CloneNotSupportedException e)
                            {
                                Trace.ERROR(this, e);
                            }
                    }
                }
            }
        }

        return resultDom;
    }

    protected BeanGenerique loadBean(HttpServletRequest request, HttpServletResponse response, String beanName)
    {
        BeanGenerique ret = null;
        BeanData beanData = FrmWrkServlet.getBean(beanName);
        if(beanData != null)
            try
            {
                ret = UtilAction.newBean(beanData);
                if(ret != null)
                {
                    ret.setBeanData(beanData);
                    UtilAction.executeService(request, response, beanData, ret);
                }
            }
            catch(ClassNotFoundException e)
            {
                Trace.ERROR(this, e);
            }
            catch(InstantiationException e)
            {
                Trace.ERROR(this, e);
            }
            catch(IllegalAccessException e)
            {
                Trace.ERROR(this, e);
            }
            catch(Exception e)
            {
                Trace.ERROR(this, e);
            }
        return ret;
    }

    private String classNameByTable(Document dom, ServletContext context, String hbnpath, String table)
        throws IOException, SAXException, ParserConfigurationException, TransformerException
    {
        String ret = null;
        BeanHbnClass bean = (BeanHbnClass)hbnClassByTable.get(table);
        if(bean != null)
            ret = bean.getClassName();
        return ret;
    }

    private String fieldNameByColumn(Document dom, String table, String column)
        throws IOException, SAXException, ParserConfigurationException, TransformerException
    {
        String ret = null;
        BeanHbnClass bean = (BeanHbnClass)hbnClassByTable.get(table);
        if(bean != null)
        {
            BeanHbnProperty beanProperty = bean.getHbnProperty(column);
            if(beanProperty != null)
                ret = beanProperty.getName();
        }
        return ret;
    }

    private String idNameByColumn(Document dom, String table, String column)
        throws IOException, SAXException, ParserConfigurationException, TransformerException
    {
        String ret = null;
        BeanHbnClass bean = (BeanHbnClass)hbnClassByTable.get(table);
        if(bean != null)
        {
            BeanHbnId beanId = bean.getHbnId(column);
            if(beanId != null)
                ret = beanId.getName();
        }
        return ret;
    }

    private void iniHbnClass(Document dom, ServletContext context, String hbnpath)
        throws IOException, SAXException, ParserConfigurationException, TransformerException
    {
        DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
        File fHbnpath = new File(UtilPath.formatPath(dom, hbnpath));
        File listFile[] = fHbnpath.listFiles();
        Document domHbn = null;
        BeanHbnClass beanHbnClass = null;
        long len = listFile.length;
        for(int i = 0; (long)i < len; i++)
        {
            domHbn = docBuilder.parse(listFile[i]);
            beanHbnClass = AdpXmlHibernate.toBeanHbnByDB(context, domHbn);
            hbnClassByTable.put(beanHbnClass.getTable(), beanHbnClass);
        }

    }

    private Hashtable hbnTableName;
    private Hashtable hbnFileName;
    private Hashtable hbnClassByTable;
}
