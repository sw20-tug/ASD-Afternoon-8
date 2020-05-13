package com.example.springboot;


import com.sun.org.apache.xpath.internal.operations.Bool;
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
public class favorite {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private RecipeRepository recipeRepository;

    @Test
    public void whenCreatingRecipe_thenReturnFavoriteFalse() {
        Recipe recipe = new Recipe();
        recipe.setTitle("test");
        entityManager.persistAndFlush(recipe);


            assertThat(recipe.getFavorite()).isEqualTo(false);


    }


}

