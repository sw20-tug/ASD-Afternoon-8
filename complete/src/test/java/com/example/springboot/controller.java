package com.example.springboot;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class controller {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RecipeRepository recipeRepository;




    @Test
   public void controller_basic_test() throws Exception {
        System.out.println("Found title:");
        Recipe recipe_2 = new Recipe();
        System.out.println("Found 2:");
        recipe_2.setTitle("Test");
        recipe_2.setId(2);
        //estEntityManager_2.persistAndFlush(recipe_2);
        System.out.println("Found title:" + recipe_2.getId());


        System.out.println("Found title:" + recipe_2.getTitle());

        mockMvc.perform(get("/demo/recipes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    @Test
    public void print_all_recipes() throws Exception {
        Recipe recipe_2 = new Recipe();
        recipe_2.setTitle("Test");
        recipe_2.setId(2);
        System.out.println("Found title:" + recipe_2.getId());


        System.out.println("Found title:" + recipe_2.getTitle());


        MvcResult mvcResult = mockMvc.perform(get("/demo/recipes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(recipe_2))
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        String responseData = mvcResult.getResponse().getContentAsString();

        System.out.println(responseData);
    }


    @Test
    public void add_delete_recipe() throws Exception {
        MvcResult response = mockMvc.perform(get("/demo/recipes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        List<Recipe> beforeAdd = objectMapper.readValue(
                response.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructParametricType(List.class, Recipe.class)
        );

        Recipe recipe_2 = new Recipe();
        recipe_2.setTitle("Test Recipe");
        recipe_2.setDescription("test");
        recipe_2.setType("test");
        recipe_2.setCookingtimeime(1);
        recipe_2.setPreparationtime(1);
        recipe_2.setContent("test");
        recipe_2.setDifficulty(1);
        recipe_2.setFavorite(false);
        recipe_2.setDisable_steps(false);

       mockMvc.perform(post("/demo/recipes")
               .contentType(MediaType.APPLICATION_JSON)
               .content(objectMapper.writeValueAsString(recipe_2)))
               .andExpect(status().isOk());
        MvcResult response1 = mockMvc.perform(get("/demo/recipes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        List<Recipe> afterAdd = objectMapper.readValue(
                response1.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructParametricType(List.class, Recipe.class)
        );
        assertThat(afterAdd.size()).isEqualTo(beforeAdd.size() + 1);

      mockMvc.perform(
                delete("/demo/recipes/delete/{id}", afterAdd.get(afterAdd.size() - 1).getId()))
                .andExpect(status().isOk());

        MvcResult response3 = mockMvc.perform(get("/demo/recipes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
      List<Recipe> afterDelete = objectMapper.readValue(
              response3.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructParametricType(List.class, Recipe.class)
        );

      assertThat(afterDelete.size()).isEqualTo(afterAdd.size() - 1);
      assertThat(afterDelete.size()).isEqualTo(beforeAdd.size());
    }

    @Test
    public void add_delete_steps() throws Exception {
        MvcResult response = mockMvc.perform(get("/demo/steps")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        List<Steps> beforeAdd = objectMapper.readValue(
                response.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructParametricType(List.class, Steps.class)
        );


        Steps step_test = new Steps();
        step_test.setDescription("test");
        step_test.setImage("https://img.anime2you.de/2019/06/fullmetal25.jpg");
        step_test.setStep_order(1);


        mockMvc.perform(post("/demo/steps")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(step_test)))
                .andExpect(status().isOk());
        MvcResult response1 = mockMvc.perform(get("/demo/steps")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        List<Steps> afterAdd = objectMapper.readValue(
                response1.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructParametricType(List.class, Steps.class)
        );
        assertThat(afterAdd.size()).isEqualTo(beforeAdd.size() + 1);

        mockMvc.perform(
                delete("/demo/steps/delete/{id}", afterAdd.get(afterAdd.size() - 1).getId()))
                .andExpect(status().isOk());

        MvcResult response3 = mockMvc.perform(get("/demo/steps")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        List<Steps> afterDelete = objectMapper.readValue(
                response3.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructParametricType(List.class, Steps.class)
        );

        assertThat(afterDelete.size()).isEqualTo(afterAdd.size() - 1);
        assertThat(afterDelete.size()).isEqualTo(beforeAdd.size());
    }
}


