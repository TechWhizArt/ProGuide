import java.sql.*;

public class Dbconnect {
    public static void main (String args[]) throws Exception{
        String sql= "select \"Name\" from student where id=2";
        String url = "jdbc:postgresql://localhost:5432/postdb";
        String username = "postgres";
        String password = "postgres";
        Connection con = DriverManager.getConnection(url, username, password );

        Statement st = con.createStatement();

        ResultSet rs = st.executeQuery(sql);

        rs.next();
        String name = rs.getString(1);
        System.out.println(name);
    }
}
