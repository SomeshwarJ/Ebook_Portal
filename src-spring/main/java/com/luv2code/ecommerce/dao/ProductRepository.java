package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Serializable;
import java.util.List;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM product WHERE category_id1 = :id OR category_id2 = :id OR category_id3 = :id",
            nativeQuery = true)
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

    @Query(value = "SELECT p.*, o.date_created `dateCreated` FROM product p right join order_item ot on ot.product_id = p.id right join orders o on o.id = ot.order_id right join customer c on o.customer_id = c.id where c.email = :email",
            nativeQuery = true)
    Page<Product> findByEmailId(@Param("email") String email, Pageable pageable);

}
