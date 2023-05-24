
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;



import convertors.ConvertToJson;
import entity.Product;
import entity.Cover;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import session.ProductFacade;
import session.CoverFacade;

/**
 *
 * @author Melnikov
 */
@WebServlet(name = "BookServlet", urlPatterns = {
    "/createProduct",
    "/createCover",
    "/listCovers",
    "/listProducts",
    
    
})
@MultipartConfig
public class ProductServlet extends HttpServlet {
    
    @EJB private CoverFacade coverFacade;
    @EJB private ProductFacade productFacade;
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
        String path = request.getServletPath();
        switch (path) {
            case "/createProduct":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject createBookJsonObject = jsonReader.readObject();
                String name = createBookJsonObject.getString("productName");
                String brand = createBookJsonObject.getString("brand");
                String cost = createBookJsonObject.getString("cost");
                String quantity = createBookJsonObject.getString("quantity");
                String razmer = createBookJsonObject.getString("razmer");
                String coverId = createBookJsonObject.getString("coverId");
                Product product = new Product();
                product.setName(name);
                product.setBrand(brand);
                product.setCost(Integer.parseInt(cost));
                product.setQuantity(Integer.parseInt(quantity));
                product.setRazmer(Integer.parseInt(razmer));
                JsonObjectBuilder job = Json.createObjectBuilder();
                Cover cover = coverFacade.find(Long.parseLong(coverId));
                
                product.setCover(cover);
                try {
                    productFacade.create(product);
                    job.add("info", "Книга успешно добавлена");
                } catch (Exception e) {
                    job.add("info", "Ошибка: "+e);
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/createCover":
                String description = request.getParameter("description");
                Part part = request.getPart("file");
                String fileName = getFileName(part);
                String pathToDir = "C:\\UploadDir\\JPTV21WebLibrarJS";
                File file = new File(pathToDir);
                file.mkdirs();
                String pathToFile = pathToDir+File.separator+fileName;
                file = new File(pathToFile);
                try(InputStream fileContent = part.getInputStream()){
                    Files.copy(fileContent, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                }
                cover = new Cover();
                cover.setUrl(pathToFile);
                cover.setDescription(description);
                job = Json.createObjectBuilder();
                try {
                    coverFacade.create(cover);
                    job.add("info", "Обложка успешно добавлена");
                } catch (Exception e) {
                    job.add("info", "Добавить обложку не удалось");
                    
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/listCovers":
                List<Cover>listCovers = coverFacade.findAll();
                ConvertToJson convertToJson = new ConvertToJson();
                try (PrintWriter out = response.getWriter()) {
                    JsonArray jsonListCovers = convertToJson.getJsonArrayCovers(listCovers);
                    out.println(jsonListCovers.toString());
                }
                break;
            case "/listProducts":
                //создаем json-массив jabBooks для книг
                JsonArrayBuilder jabBooks = Json.createArrayBuilder();
                List<Product> listBooks = productFacade.findAll();
                for (int i = 0; i < listBooks.size(); i++) {
                    Product p = listBooks.get(i);                       
                    JsonObjectBuilder jsonCover = Json.createObjectBuilder();//создаем json-объект Cover
                    jsonCover.add("id", p.getCover().getId());
                    jsonCover.add("url", p.getCover().getUrl());
                    jsonCover.add("description",p.getCover().getDescription()); 
                    //создаем json-объект книги
                    job = Json.createObjectBuilder();
                    job.add("id", p.getId());
                    job.add("name", p.getName());
                    job.add("cost", p.getCost());
                    job.add("quantity", p.getQuantity());
                    job.add("razmer", p.getRazmer());
                    job.add("brand", p.getBrand());
                    job.add("cover", jsonCover.build());
                 
                    jabBooks.add(job.build());// в json-массиве jabBooks дежат json-объекты книг
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(jabBooks.build().toString()); //отправляем в out json-массив с книгами в виде строки
                }
                break;
        }
        
      
    }
    private String getFileName(Part part) {
        for (String content : part.getHeader("content-disposition").split(";")){
            if(content.trim().startsWith("filename")){
                return content
                        .substring(content.indexOf('=')+1)
                        .trim()
                        .replace("\"",""); 
            }
        }
        return null;
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
