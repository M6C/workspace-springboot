// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvTableContent.java

package workspace.service.generator.jsp.db.mysql;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.PrintStream;
import java.sql.*;
import javax.servlet.ServletContext;
import javax.servlet.http.*;

public class SrvTableContent extends SrvGenerique
{

    public SrvTableContent()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        try
        {
            String szDbConnectDriver = "com.mysql.jdbc.Driver";
            String szDbConnectUrl = "jdbc:mysql://localhost/db_hibernate";
            String szDbConnectFile = "";
            String szDbConnectUser = "root";
            String szDbConnectPassword = "";
            String szQueryTable = "SELECT * FROM information_schema.TABLES";
            PreparedStatement stmt = null;
            Connection con = null;
            ResultSet res = null;
            Class.forName(szDbConnectDriver);
            con = DriverManager.getConnection((new StringBuilder(String.valueOf(szDbConnectUrl))).append(szDbConnectFile).toString(), szDbConnectUser, szDbConnectPassword);
            stmt = con.prepareStatement(szQueryTable);
            for(res = stmt.executeQuery(); res.next();)
            {
                ResultSetMetaData rsmd = res.getMetaData();
                for(int i = 1; i <= rsmd.getColumnCount(); i++)
                {
                    String szName = rsmd.getColumnLabel(i);
                    res.getObject(i);
                    rsmd.getColumnType(i);
                    rsmd.getColumnTypeName(i);
                }

            }

        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
        }
    }
}
