package com.example.springboot;
import com.example.springboot.Steps;

import org.springframework.data.repository.CrudRepository;

import java.util.List;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface StepsRepository extends CrudRepository<Steps, Integer> {
    List<Steps> findByrecipeid(Integer id);
}