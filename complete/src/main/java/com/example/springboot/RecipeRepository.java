package com.example.springboot;
import com.example.springboot.Recipe;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
//import com.sun.org.apache.xpath.internal.operations.Bool;



// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface RecipeRepository extends CrudRepository<Recipe, Integer> {

    List<Recipe> findByFavorite(boolean favorite);

    List<Recipe> findByTitle(String title);

    List<Recipe> findByType(String type);

    List<Recipe> findByPreparationtime(Integer time);

    List<Recipe> findByCookingtime(Integer time);

    List<Recipe> findAllByFavorite(Boolean favorite);

    boolean existsRecipeById(Integer id);

    boolean existsRecipeByTitle(String title);

    boolean existsRecipeByDescription(String description);

    boolean existsRecipeByType(String type);

    boolean existsRecipeByPreparationtime(Integer preparationtime);

    boolean existsRecipeByCookingtime(Integer cookingtime);


    boolean existsRecipeByContent(String content);

    boolean existsRecipeByDifficulty(Integer Difficulty);



}