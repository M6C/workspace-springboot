// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaCompletion.java

package workspace.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilPackage;
import framework.ressource.util.UtilPackageResource;
import framework.ressource.util.UtilReflect;
import framework.ressource.util.UtilSafe;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.util.UtilPath;

public class SrvEditorJavaCompletion extends SrvGenerique
{

    public SrvEditorJavaCompletion()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        String className = (String)bean.getParameterDataByName("className");
        String source = (String)bean.getParameterDataByName("source");
        String caretPos = (String)bean.getParameterDataByName("caretPos");
        String filename = (String)bean.getParameterDataByName("filename");
        String deleteFile = (String)bean.getParameterDataByName("deleteFile");
        Method listMethod[] = (Method[])null;
        File file = null;

        try {
	        if (UtilString.isNotEmpty(filename)) {
		        Document dom = (Document)request.getSession().getAttribute("resultDom");
		        String filenameFormated = UtilPath.formatPath(dom, filename);
	            if(UtilString.isNotEmpty(filenameFormated)) {
	                file = new File(filenameFormated);
	                if(file != null && file.exists() && file.isFile()) {
	                    source = read(file);
	                } else {
	                	file = null;
	                }
	            }
	        }
	        if(UtilString.isEmpty(className) && UtilString.isNotEmpty(source) && UtilString.isNotEmpty(caretPos))
	        {
	            int iCaretPos = Integer.parseInt(caretPos);
	            source = URLDecoder.decode(source);
	            className = getClassBeforePos(source, iCaretPos);
	        }
	        if(UtilString.isNotEmpty(className)) {
	            listMethod = UtilReflect.getMethods(className);
	        } else {
	        	className = "Undefined class";
	        }
	        doResponse(request, response, bean, className, caretPos, listMethod);
        }
        catch(ClassNotFoundException classnotfoundexception) {
        }
        finally {
			 if (file != null && deleteFile != null && Boolean.TRUE.toString().equalsIgnoreCase(deleteFile)) {
				 if (!file.delete()) {
					 Trace.WARNING(this, (new StringBuilder("file '")).append(file.getPath()).append("' can not be deleted.").toString());
				 } else {
					 Trace.DEBUG(this, (new StringBuilder("file '")).append(file.getPath()).append("' deleted.").toString());
				 }
			 }
		}
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String className, String caretPos, Method listMethod[])
        throws Exception
    {
        if(listMethod != null)
        {
            PrintWriter out = response.getWriter();
            int size = listMethod.length;
            StringBuffer sb = (new StringBuffer(className)).append(":");
            Method method = null;
            Class listCls[] = (Class[])null;
            Class cls = null;
            for(int i = 0; i < size; i++)
            {
                method = listMethod[i];
                sb.append(method.getName());
                sb.append("(");
                listCls = method.getParameterTypes();
                if(listCls != null)
                {
                    int sizeParam = listCls.length - 1;
                    for(int j = 0; j <= sizeParam; j++)
                    {
                        cls = listCls[j];
                        sb.append(cls.getName());
                        if(j < sizeParam)
                            sb.append(", ");
                    }

                }
                sb.append("):");
            }

            out.print(sb.toString());
        }
    }

    private String read(File file) throws IOException {
        Trace.DEBUG(this, (new StringBuilder("read file '")).append(file.getPath()).append("'").toString());
        StringBuffer ret = new StringBuffer();
        if (file.exists()) {
//        	UtilFile.read(file);
//			Trace.DEBUG(this, (new StringBuilder("file '")).append(file.getPath()).append("' read.").toString());
	        FileReader fr = new FileReader(file);
	        BufferedReader in = new BufferedReader(fr) ;
	        try {
		        int ch = -1;
		        int iNbLine = 0;
		        while((ch = in.read()) != -1) 
		        {
		            if(ch == 13)
		                iNbLine++;
		            ret.append((char)ch);
		        }
	        } finally {
	            try {
	            	in.close();
	            } finally {
	    			fr.close();
					 Trace.DEBUG(this, (new StringBuilder("file '")).append(file.getPath()).append("' read.").toString());
	    		}
			}
        } else {
            Trace.ERROR(this, (new StringBuilder("file '")).append(file.getPath()).append("' do not exist.").toString());
        }
        return ret.toString();
    }

    private String getClassBeforePos(String source, int pos)
        throws IOException
    {
        String ret = null;
        String sourceReverse = UtilString.reverseString(source.substring(0, pos));
        String szVar = UtilString.getWordBeforePos(source, pos, false);
        if(UtilString.isNotEmpty(szVar))
        {
            while(szVar.endsWith(".")) 
            {
                szVar = szVar.substring(0, szVar.length() - 1);
                pos--;
            }
            List listVar = new ArrayList();
            List listClass = new ArrayList();
            List listPackage = getListPackage(source);
            UtilString.split(szVar, '.', listVar);
            if(UtilVector.safeNotEmpty(listVar))
            {
                int size = listVar.size();
                String var = null;
                String varReverse = null;
                for(int i = 0; i < size; i++)
                {
                    var = (String)listVar.get(i);
                    if(UtilString.isNotEmpty(var) && i == 0)
                    {
                        varReverse = UtilString.reverseString(var);
                        int idxRev = varReverse.length();
                        boolean isLoop = true;
                        while(isLoop) 
                        {
                            idxRev = UtilString.indexOfWordOnly(sourceReverse, varReverse, idxRev);
                            if(idxRev >= 0)
                            {
                                int idx = pos - idxRev - var.length();
                                String szDeclaration = getClassDeclaration(source, idx);
                                if(UtilString.isNotEmpty(szDeclaration))
                                {
                                    if(szDeclaration.indexOf('.') >= 0)
                                        listClass.add(i, szDeclaration.trim());
                                    else
                                        addClassFromPackage(listClass, i, listPackage, szDeclaration);
                                    isLoop = false;
                                }
                                idxRev += varReverse.length();
                            } else
                            {
                                addClassFromPackage(listClass, i, listPackage, var);
                                isLoop = false;
                            }
                        }
                    }
                }

            }
            if(!listClass.isEmpty())
            {
                for(Iterator it = listClass.iterator(); it.hasNext();)
                    ret = (String)it.next();

            }
        }
        return ret;
    }

    private void addClassFromPackage(List listClass, int i, List listPackage, String var)
        throws IOException
    {
        String objClassImport = findClassInPackage(listPackage, var);
        if(objClassImport != null)
            listClass.add(i, objClassImport.trim());
    }

    private String findClassInPackage(List listPackage, String classe)
        throws IOException
    {
        String ret = null;
        int size = listPackage.size();
        for(int i = 0; i < size && ret == null; i++)
        {
            String szPackage = (String)listPackage.get(i);
            if(szPackage.endsWith(".*"))
            {
                szPackage = szPackage.substring(0, szPackage.lastIndexOf('.'));
                try
                {
                    Class c = UtilReflect.loadClass((new StringBuilder(String.valueOf(szPackage))).append(".").append(classe).toString());
                    if(c != null)
                        ret = (new StringBuilder(String.valueOf(szPackage))).append(".").append(classe).toString();
                }
                catch(ClassNotFoundException classnotfoundexception) { }
            } else
            if(szPackage.endsWith((new StringBuilder(".")).append(classe).toString()))
                ret = szPackage;
        }

        return ret;
    }

    private List getListPackage(String text)
        throws IOException
    {
        List ret = new ArrayList();
        String sz = null;
        int idxClass = UtilString.indexOfWordOnly(text, "class");
        if(idxClass > 0)
        {
            int idxImport = 0;
            int idxPackage = 0;
            int idxEnd = 0;
            int idxDot = 0;
            addPackageAfterWord(ret, text, "package", idxPackage, idxClass);
            for(; idxImport >= 0; idxImport++)
            {
                idxImport = addPackageAfterWord(ret, text, "import", idxImport, idxClass);
                if(idxImport < 0)
                    break;
            }

        }
        ret.add("java.lang.*");
        return ret;
    }

    private int addPackageAfterWord(List listPackage, String text, String word, int idxStart, int idxEnd)
    {
        int ret = -1;
        idxStart = UtilString.indexOfWordOnly(text, word, idxStart);
        if(idxStart >= 0 && idxStart < idxEnd)
        {
            int idx = text.indexOf(';', idxStart);
            if(idxStart < idx && idx < idxEnd)
            {
                String pack = text.substring(idxStart + word.length(), idx);
                listPackage.add(pack.replace('\240', ' ').trim());
                ret = idxStart;
            }
        }
        return ret;
    }

    private String getClassDeclaration(String text, int pos)
    {
        String ret = null;
        String szDeclaration = UtilString.getWordBeforePos(text, pos, false);
        if(UtilString.isNotEmpty(szDeclaration) && szDeclaration.indexOf('(') < 0 && szDeclaration.indexOf('+') < 0 && UtilString.isNotEqualsIgnoreCase(szDeclaration, "void") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "boolean") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "short") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "int") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "long") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "char") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "float") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "double") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "byte") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "public") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "protected") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "private") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "static") && UtilString.isNotEqualsIgnoreCase(szDeclaration, "final"))
            ret = szDeclaration;
        return ret;
    }

    private List old_getClassLocation()
        throws IOException
    {
        ArrayList ret = new ArrayList();
        UtilVector.addElements(ret, UtilPackage.getClassPathResources());
        return ret;
    }

    private List old_findClass(List listClassResource, String packageClass)
    {
        List ret = new ArrayList();
        String fileName = null;
        String pathPackageClass = (new StringBuilder(String.valueOf(packageClass.replaceAll(".", "/")))).append(".class").toString();
        int size = UtilSafe.safeListSize(listClassResource);
        for(int i = 0; i < size; i++)
        {
            fileName = (String)listClassResource.get(i);
            File file = new File(fileName);
            if(file.exists())
                if(file.isDirectory())
                {
                    File listFile[] = file.listFiles(new FilenameFilter() {

                        public boolean accept(File file, String string)
                        {
                            return UtilFile.isExtFile(string, ".class");
                        }
                    });
                    int sizeListFile = UtilSafe.safeListSize(listFile);
                    if(sizeListFile > 0)
                    {
                        String sz = UtilFile.getPathRelative(file, listFile[0]);
                        sz = sz.substring(0, sz.lastIndexOf('-'));
                        ret.add(UtilPackage.getClassNameToFileName(sz));
                    }
                } else
                if(UtilFile.isExtFile(fileName, ".jar"))
                    try
                    {
                        ZipFile zip = new ZipFile(file);
                        ZipEntry entriePack = zip.getEntry(pathPackageClass);
                        if(entriePack != null)
                            ret.add(packageClass);
                    }
                    catch(Exception exception) { }
        }

        return ret;
    }

    private String old_getClassContructeur(String text, int pos)
    {
        String ret = null;
        StringBuffer sbDefinition = new StringBuffer();
        for(int j = pos; j < pos; j++)
        {
            char car = text.charAt(j);
            if(car == ';')
                break;
            sbDefinition.append(text.charAt(j));
        }

        String szDefinition = sbDefinition.toString().trim();
        int idxEq = szDefinition.indexOf('=');
        if(idxEq >= 0)
        {
            int idxNew = szDefinition.toUpperCase().indexOf("NEW ", idxEq);
            if(idxNew >= 0 && UtilString.isEmpty(szDefinition.substring(idxEq, idxNew).trim()))
            {
                int idxParDeb = szDefinition.indexOf("(", idxNew);
                ret = szDefinition.substring(idxNew + 3, idxParDeb).trim();
            }
        }
        return ret;
    }

    private Hashtable old_getClassImport2(String text)
    {
        Hashtable ret = new Hashtable();
        Vector vListPackage = UtilPackage.computePackageResources();
        int idxClass = UtilString.indexOfWordOnly(text, "class");
        if(idxClass > 0)
        {
            int idxImport = 0;
            int idxPackage = 0;
            int idxEnd = 0;
            int idxDot = 0;
            boolean isLoop = false;
            idxPackage = UtilString.indexOfWordOnly(text, "package");
            if(idxPackage >= 0)
            {
                idxEnd = text.indexOf(';', idxImport);
                if(idxPackage < idxClass && idxEnd < idxPackage)
                {
                    String szPackage = text.substring(idxPackage + 6, idxEnd).trim();
                    for(int i = 0; i < vListPackage.size(); i++)
                    {
                        UtilPackageResource item = (UtilPackageResource)vListPackage.elementAt(i);
                        idxDot = item.pack.lastIndexOf('.');
                        ret.put(item.pack.substring(idxDot + 1), item.pack);
                    }

                }
            }
            do
            {
                isLoop = false;
                idxImport = UtilString.indexOfWordOnly(text, "import");
                if(idxImport >= 0)
                {
                    idxEnd = text.indexOf(';', idxImport);
                    if(idxImport < idxClass && idxImport < idxEnd)
                    {
                        String szPackage = text.substring(idxImport + 6, idxEnd).trim();
                        if(szPackage.endsWith(".*"))
                        {
                            idxDot = szPackage.lastIndexOf('.');
                            szPackage = szPackage.substring(0, idxDot);
                            for(int i = 0; i < vListPackage.size(); i++)
                            {
                                UtilPackageResource item = (UtilPackageResource)vListPackage.elementAt(i);
                                if(szPackage.equals(item.pack))
                                    ret.put(item.pack, item.pack);
                            }

                        } else
                        {
                            idxDot = szPackage.lastIndexOf('.');
                            if(idxDot > 0)
                                ret.put(szPackage.substring(idxDot + 1), szPackage);
                            else
                                ret.put(szPackage, szPackage);
                        }
                        isLoop = true;
                    }
                }
            } while(isLoop);
        }
        return ret;
    }
}
