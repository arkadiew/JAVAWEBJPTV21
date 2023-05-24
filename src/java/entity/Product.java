/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author pupil
 */
@Entity
public class Product implements Serializable{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private String brand;
    private int cost;
    private int quantity;
    private int razmer;
    @OneToOne
        private Cover cover;
    
    public String getName() {
        return productName;
    }

    public void setName(String productName) {
        this.productName = productName;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Product() {
    }
    public int getRazmer() {
        return razmer;
    }

    public void setRazmer(int razmer) {
        this.razmer = razmer;
    }
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Cover getCover() {
        return cover;
    }

    public void setCover(Cover cover) {
        this.cover = cover;
    }
    @Override
    public String toString() {
        return "shop{" 
                + "name=" + productName 
                + ", cost=" + cost 
                + ", quantity=" + quantity 
                + ", razmer=" + razmer 
                + ", brand=" + brand
                + ", cover=" + cover.getUrl() 
                + '}';
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + Objects.hashCode(this.id);
        hash = 29 * hash + Objects.hashCode(this.productName);
        hash = 29 * hash + Objects.hashCode(this.brand);
        hash = 29 * hash + this.cost;
        hash = 29 * hash + this.quantity;
        hash = 29 * hash + this.razmer;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Product other = (Product) obj;
        if (this.cost != other.cost) {
            return false;
        }
        if (this.quantity != other.quantity) {
            return false;
        }
        if (this.razmer != other.razmer) {
            return false;
        }
        if (!Objects.equals(this.productName, other.productName)) {
            return false;
        }
        if (!Objects.equals(this.brand, other.brand)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    

    

    
    
}

