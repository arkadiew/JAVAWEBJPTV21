/*
 * Конвертор создает JsonObject/JsonArray формат классов Java.
 * Используйте соответствующие методы для преобразования.
 */
package convertors;


import entity.Product;
import entity.Cover;
import entity.Purchase;
import entity.User;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import servlets.UserServlet;

/**
 *
 * @author Melnikov
 */
public class ConvertToJson {

    /**
     * Преобразование Map<Author, List<Book>> в JsonArray объектов JsonEntry
     * @param mapAuthors
     * @return JsonArray - массив объектов JsonEntry с ключем "author" и значением "authorBooks"
     */
    
    
    public JsonObject getJsonObjectProduct(Product product){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", product.getId());
        job.add("bookName", product.getName());
        job.add("publishedYear", product.getBrand());
        job.add("publishedYear", product.getCost());
        job.add("quantity", product.getQuantity());        
        job.add("quantity", product.getRazmer());

       
        return job.build();
    }
//      public JsonObject getJsonObjectPurchase(Purchase purchase){
//        JsonObjectBuilder job = Json.createObjectBuilder();
//        job.add("id", purchase.getId());
//        job.add("user", purchase.getUser());
//        job.add("publishedYear", purchase.getBrand());
//        job.add("publishedYear", purchase.getCost());
//        job.add("quantity", purchase.getQuantity());        
//        job.add("quantity", purchase.getRazmer());
//
//       
//        return job.build();
//    }
//    
    
    
    
    public JsonArray getJsonArrayProducts(List<Product>listProducts){
        JsonArrayBuilder jar = Json.createArrayBuilder();
        for (int i = 0; i < listProducts.size(); i++) {
            Product product = listProducts.get(i);
            jar.add(getJsonObjectProduct(product));
        }
        return jar.build();
    }
    public JsonArray getJsonArrayCovers(List<Cover> listCovers){
        JsonArrayBuilder jar = Json.createArrayBuilder();
        JsonObjectBuilder job = Json.createObjectBuilder();
        for (int i = 0; i < listCovers.size(); i++) {
            Cover cover = listCovers.get(i);
            job.add("id", cover.getId());
            job.add("url",cover.getUrl());
            job.add("description",cover.getDescription());
            jar.add(job);
        }
        return jar.build();
        
    }

    public JsonArray getJsonObjectMapUsers(Map<User, List<Product>> mapUsers) {
        JsonArrayBuilder jsonMapBuilder = Json.createArrayBuilder();
        JsonObjectBuilder jsonEntryObjectBuilder = Json.createObjectBuilder();
        for(Entry entry: mapUsers.entrySet()){
            User user = (User) entry.getKey();
            List<Product> readingBooks = (List<Product>) entry.getValue();
            JsonObject jsonObjectUser = getJsonObjectUser(user);
            JsonArray jsonArrayReadingBooks = getJsonArrayProducts(readingBooks);
            jsonEntryObjectBuilder.add("key",jsonObjectUser);
            jsonEntryObjectBuilder.add("value",jsonArrayReadingBooks);
            jsonMapBuilder.add(jsonEntryObjectBuilder.build());
        }
        return jsonMapBuilder.build(); 
    }

    public JsonObject getJsonObjectUser(User user) {
        JsonArrayBuilder jar = Json.createArrayBuilder();
        JsonObjectBuilder job = Json.createObjectBuilder();
        for (int i = 0; i < user.getRoles().size(); i++) {
            String role  = user.getRoles().get(i);
            jar.add(role);
        }
        job.add("id", user.getId())
                .add("firstname", user.getFirstname())
                .add("lastname", user.getLastname())
                .add("phone", user.getPhone())
                .add("login", user.getLogin())
                .add("roles",jar.build());
        return job.build();    
    }
    public JsonArray getJsonArrayUsers(List<User> listUsers){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (int i = 0; i < listUsers.size(); i++) {
            User user = listUsers.get(i);
            jab.add(getJsonObjectUser(user));
        }
        return jab.build();
    }
    public JsonArray getJsonArrayRoles(){
        JsonArrayBuilder jar = Json.createArrayBuilder();
        for (int i = 0; i < UserServlet.Role.values().length;i++) {
            Object elem = UserServlet.Role.values()[i];
            jar.add(elem.toString());
        }
        return jar.build();
    }
     public JsonArray getJAMapStatistic(Map<Product,Integer> mapProductsRange){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        JsonObjectBuilder jsonEntryObjectBuilder = Json.createObjectBuilder();
        for(Entry entry: mapProductsRange.entrySet()){
            Product product = (Product) entry.getKey();
            int n = (int) entry.getValue();
            jsonEntryObjectBuilder.add("key", getJsonObjectProduct(product));
            jsonEntryObjectBuilder.add("value", n);
        }
        jab.add(jsonEntryObjectBuilder);
        return jab.build();
    }
//     public JsonArray getJAMapPurchase(Map<Purchase,Integer> mapPurchaseRange){
//        JsonArrayBuilder jab = Json.createArrayBuilder();
//        JsonObjectBuilder jsonEntryObjectBuilder = Json.createObjectBuilder();
//        for(Entry entry: mapPurchaseRange.entrySet()){
//            Purchase purchase = (Purchase) entry.getKey();
//            int n = (int) entry.getValue();
//            jsonEntryObjectBuilder.add("key", getJsonObjectPurchase(purchase.getHistory()));
//            jsonEntryObjectBuilder.add("value", n);
//        }
//        jab.add(jsonEntryObjectBuilder);
//        return jab.build();
//    }
}
