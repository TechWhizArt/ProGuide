import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import org.json.JSONObject;

public class Dbconnect {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8081), 0); // Server listens on port 8080
        server.createContext("/login", new LoginHandler());
        server.setExecutor(null); // Use the default executor
        server.start();
        System.out.println("Server started on port 8081");
    }

    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Allow all origins to access the server
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                // Respond to OPTIONS request
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if ("POST".equals(exchange.getRequestMethod())) {
                InputStream inputStream = exchange.getRequestBody();
                String requestBody = new String(inputStream.readAllBytes());

                JSONObject json = new JSONObject(requestBody);
                String username = json.getString("username");
                String password = json.getString("password");

                boolean success = insertIntoDatabase(username, password);

                String response = "{\"success\":" + success + "}";
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else {
                exchange.sendResponseHeaders(405, -1); // Method not allowed
            }
        }

        private boolean insertIntoDatabase(String username, String password) {
            String url = "jdbc:postgresql://localhost:5432/postdb";
            String dbUser = "postgres";
            String dbPassword = "postgres";

            String sql = "INSERT INTO student (\"name\", \"password\") VALUES (?, ?)";

            try (Connection con = DriverManager.getConnection(url, dbUser, dbPassword);
                 PreparedStatement pst = con.prepareStatement(sql)) {

                pst.setString(1, username);
                pst.setString(2, password);
                pst.executeUpdate();
                return true;

            } catch (SQLException e) {
                e.printStackTrace();
                return false;
            }
        }
    }
}
