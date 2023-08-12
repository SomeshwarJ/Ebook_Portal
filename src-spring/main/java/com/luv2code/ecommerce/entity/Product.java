package com.luv2code.ecommerce.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_id1", nullable = false)
    private Long subject;

    @Column(name = "category_id2", nullable = false)
    private Long semester;

    @Column(name = "category_id3", nullable = false)
    private Long department;

    @Column(name = "sku", nullable = true)
    private String sku;

    @Column(name = "name", nullable = true)
    private String name;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "unit_price", nullable = true)
    private BigDecimal unitPrice;

    @Column(name = "image_url", nullable = true)
    private String imageUrl;

    @Column(name = "active", nullable = true)
    private boolean active;

    @Column(name = "units_in_stock", nullable = true)
    private int unitsInStock;

    @Column(name = "date_created", nullable = true)
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated", nullable = true)
    @UpdateTimestamp
    private Date lastUpdated;


}
