package com.example.springboot;


//import com.sun.org.apache.xpath.internal.operations.Bool;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class addRecipe {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private RecipeRepository recipeRepository;

    @Test
    public void whenFindByTitle_thenReturnRecipe() {
        Recipe recipe = new Recipe();
        recipe.setTitle("test");
        entityManager.persistAndFlush(recipe);

        List<Recipe> found = recipeRepository.findByTitle(recipe.getTitle());

        for (int i = 0; i < found.size(); i++) {
            System.out.println("Found title:" + found.get(i).getTitle());
            assertThat(found.get(i).getTitle()).isEqualTo(recipe.getTitle());
        }

    }

    @Test
    public void whenInvalidTitle_thenReturnNull() {
        List<Recipe> found_fromDb = recipeRepository.findByTitle("doesNotExist");
        assertThat(found_fromDb).isEmpty();
    }

    @Test
    public void whenFindById_thenReturnRecipe() {
        Recipe recipe = new Recipe();
        recipe.setTitle("test");
        entityManager.persistAndFlush(recipe);

        Recipe fromDb = recipeRepository.findById(recipe.getId()).orElse(null);
        assertThat(fromDb.getTitle()).isEqualTo(recipe.getTitle());
    }

    @Test
    public void whenInvalidId_thenReturnNull() {
        Recipe fromDb = recipeRepository.findById(-11).orElse(null);
        assertThat(fromDb).isNull();

    }

    @Test
    public void whenInvalidPreptime_thenReturnNull() {
        List<Recipe> recipe = recipeRepository.findByPreparationtime(-11);
        assertThat(recipe).isEmpty();

    }

    @Test
    public void whenInvalidCooktime_thenReturnNull() {
        List<Recipe> recipe = recipeRepository.findByCookingtime(-11);
        assertThat(recipe).isEmpty();

    }

    @Test
    public void givenSetOfRecipes_whenFindAll_thenReturnAllRecipes() {
        Recipe recipe = new Recipe();
        recipe.setTitle("rezept_1");
        Recipe recipe_2 = new Recipe();
        recipe_2.setTitle("rezept_2");
        Recipe recipe_3 = new Recipe();
        recipe_3.setTitle("rezept_3");

        entityManager.persist(recipe);
        entityManager.persist(recipe_2);
        entityManager.persist(recipe_3);
        entityManager.flush();

        List<Recipe> allrecipes = (List<Recipe>) recipeRepository.findAll();

        assertThat(allrecipes).hasSize(3).extracting(Recipe::getTitle).containsOnly(recipe.getTitle(), recipe_2.getTitle(), recipe_3.getTitle());
    }
}

