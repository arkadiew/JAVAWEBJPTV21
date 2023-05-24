/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import convertors.ConvertToJson;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import session.ProductFacade;
import session.UserFacade;
import tools.PassEncrypt;

/**
 *
 * @author Melnikov
 */
@WebServlet(name = "LoginServlet", loadOnStartup = 1, urlPatterns = {
    "/login",
   
    
})
public class LoginServlet extends HttpServlet {
    @EJB private UserFacade userFacade;
    @EJB private ProductFacade productFacade;

    @Override
    public void init() throws ServletException {
        super.init();
        if(userFacade.count()>0) return;
        User user = new User();
        user.setFirstname("admin");
        user.setLastname("admin");
        user.setPhone("12345678");
        user.setLogin("admin");
        PassEncrypt pe = new PassEncrypt();
        user.setSalt(pe.getSalt());
        user.setPassword(pe.getEncryptedPass("admin", user.getSalt()));
        user.getRoles().add(UserServlet.Role.USER.toString());
        user.getRoles().add(UserServlet.Role.EMPLOYEE.toString());
        user.getRoles().add(UserServlet.Role.ADMINISTRATOR.toString());
        userFacade.create(user);
    }
    
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        JsonObjectBuilder job = Json.createObjectBuilder();
        String path = request.getServletPath();
        switch (path) {
            case "/login":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject loginJsonObject = jsonReader.readObject();
                String login = loginJsonObject.getString("login");
                String password = loginJsonObject.getString("password");
                User user = userFacade.findUser(login);
                if(user == null){
                    job.add("info","Неправильный логин или пароль");
                        try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                }
                PassEncrypt pe = new PassEncrypt();
                password=pe.getEncryptedPass(password, user.getSalt());
                if(!password.equals(user.getPassword())){
                    job.add("info","Неправильный логин или пароль");
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                }
                HttpSession session = request.getSession(true);
                session.setAttribute("authUser", user);
                job.add("info", "Вы вошли как "+ user.getLogin());
                job.add("authUser", new ConvertToJson().getJsonObjectUser(user));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/logout":
                session = request.getSession(false);
                if(session != null){
                    if(session.getAttribute("authUser") != null){
                        session.invalidate();
                        job.add("info","Вы вышли из программы");
                        try (PrintWriter out = response.getWriter()) {
                            out.println(job.build().toString());
                        }
                    }
                }
                break;
        }

        
    }
    
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
