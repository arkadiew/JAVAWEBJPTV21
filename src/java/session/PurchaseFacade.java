/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Product;
import entity.Purchase;
import entity.User;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@Stateless
public class PurchaseFacade extends AbstractFacade<Purchase> {

    @PersistenceContext(unitName = "WebShopJSPU")
    private EntityManager em;
    @EJB private ProductFacade productFacade;
        @EJB private PurchaseFacade purchaseFacade;
    
    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public PurchaseFacade() {
        super(Purchase.class);
    }
    
    
   public Map<Product,Integer> getShopMoney(String year, String month, String day) {
        if(year== null || year.isEmpty()){
            return new HashMap<>();
        }
        List<Purchase> listPurchase = null;
        //Если выбран только год
        if((month == null || month.isEmpty()) && (day == null || day.isEmpty())){
            LocalDateTime date1 = LocalDateTime.of(Integer.parseInt(year),1, 1, 0, 0, 0); 
            LocalDateTime date2 = date1.plusYears(1);
            Date beginYear = Date.from(date1.atZone(ZoneId.systemDefault()).toInstant());
            Date nextYear = Date.from(date2.atZone(ZoneId.systemDefault()).toInstant());
            listPurchase = em.createQuery("SELECT p FROM Purchase p WHERE p.date > :beginYear AND p.date < :nextYear")
                .setParameter("beginYear", beginYear)
                .setParameter("nextYear", nextYear)
                .getResultList();
        //Если выбран год и месяц
        }else if((month != null || !month.isEmpty()) && (day == null || day.isEmpty())){
            LocalDateTime date1 = LocalDateTime.of(Integer.parseInt(year),Integer.parseInt(month), 1, 0, 0, 0); 
            LocalDateTime date2 = date1.plusMonths(1);
            Date beginMonth = Date.from(date1.atZone(ZoneId.systemDefault()).toInstant());
            Date nextMonth = Date.from(date2.atZone(ZoneId.systemDefault()).toInstant());
            listPurchase = em.createQuery("SELECT p FROM Purchase p WHERE p.date > :beginMonth AND p.date < :nextMonth")
                .setParameter("beginMonth", beginMonth)
                .setParameter("nextMonth", nextMonth)
                .getResultList();
        }else{//Если выбран год, месяц и день
            LocalDateTime date1 = LocalDateTime.of(Integer.parseInt(year),Integer.parseInt(month), Integer.parseInt(day), 0, 0, 0); 
            LocalDateTime date2 = date1.plusDays(1);
            Date beginDay = Date.from(date1.atZone(ZoneId.systemDefault()).toInstant());
            Date nextDay = Date.from(date2.atZone(ZoneId.systemDefault()).toInstant());
            listPurchase = em.createQuery("SELECT p FROM Purchase p WHERE p.date > :beginDay AND p.date < :nextDay")
                .setParameter("beginDay", beginDay)
                .setParameter("nextDay", nextDay)
                .getResultList();
        }
        //Map для хранения сопоставления книга -> сколько раз выдана
        Map<Product, Integer>mapProductsRange = new HashMap<>();
        List<Product> products = productFacade.findAll();
         List<Purchase> listPurchases = purchaseFacade.findAll();
           int sum = 0;
            for (int i = 0; i <listPurchases.size(); i++) {
                    Purchase p = listPurchases.get(i);                 
                    sum += p.getHistory();
                for (Product product : products) { //перебираем все книги
            mapProductsRange.put(product, 0);
           
               
                   
//                
//                    Integer n = mapProductsRange.get(product);
//                    
//                    n++;//к n добавляем 1, если книга есть в истории
                    mapProductsRange.put(product, sum);//обновляем значение n для книги
                  }  
               
            
        }
        return mapProductsRange; // возвращаем карту Книга->сколько раз выдана за указанный период
    }

    
}
