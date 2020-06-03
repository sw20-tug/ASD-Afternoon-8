package com.example.springboot;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        Recipe recipe_2 = new Recipe();
        recipe_2.setTitle("Test");
        recipe_2.setId(2);
        //estEntityManager_2.persistAndFlush(recipe_2);

        mockMvc.perform(get("/demo/recipes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    @Test
    public void print_all_recipes() throws Exception {
        Recipe recipe_2 = new Recipe();
        recipe_2.setTitle("Test");
        recipe_2.setId(2);

        MvcResult mvcResult = mockMvc.perform(get("/demo/recipes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(recipe_2))
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        String responseData = mvcResult.getResponse().getContentAsString();

        System.out.println(responseData);
    }


    @Test
    public void delete_recipe() throws Exception {
        Recipe recipe_2 = new Recipe();
        recipe_2.setTitle("Test");
        recipe_2.setId(2);


        MvcResult mvcResult = mockMvc.perform(post("/demo/recipes/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(recipe_2)))
                .andExpect(status().isOk())
                .andReturn();
        String responseData = mvcResult.getResponse().getContentAsString();

        MvcResult mvcResult3 = mockMvc.perform(get("/demo/recipes/"))
                .andExpect(status().isOk())
                .andReturn();
;
        String content = mvcResult3.getResponse().getContentAsString();
        Integer id = JsonPath.read(content, "[-1].id");//get the last id of the inserted recipes

        mockMvc.perform(delete("/demo/recipes/delete/{id}", id.toString()))
                .andExpect(status().isOk());

        MvcResult mvcResult2 = mockMvc.perform(get("/demo/recipes"))
                .andReturn();

        String responseData2 = mvcResult2.getResponse().getContentAsString();
        assertNotEquals(responseData.length(), responseData2.length());
    }


    @org.junit.jupiter.api.Test
    void search_2() throws Exception {
        Recipe recipe_1 = new Recipe();
        recipe_1.setTitle("Title1");
        recipe_1.setContent("Content1");
        recipe_1.setType("Type 1");
        recipe_1.setCookingtimeime(15);
        recipe_1.setPreparationtime(10);

        MvcResult mvcResult1 = mockMvc.perform(post("/demo/recipes/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(recipe_1)))
                .andExpect(status().isOk())
                .andReturn();

//        MvcResult mvcResult2 = mockMvc.perform(post("/demo/recipes/")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(recipe_2)))
//                .andExpect(status().isOk())
//                .andReturn();

        List<Recipe> response = searchRecipe(recipe_1.getTitle());
        assertEquals(response.get(response.size() - 1).getTitle(), recipe_1.getTitle());

        response = searchRecipe(recipe_1.getType());
        assertEquals(response.get(response.size() - 1).getType(), recipe_1.getType());

        response = searchRecipe(recipe_1.getPreparationtime().toString());
        assertEquals(response.get(response.size() - 1).getPreparationtime(), recipe_1.getPreparationtime());

        response = searchRecipe(recipe_1.getCookingtime().toString());
        assertEquals(response.get(response.size() - 1).getCookingtime(), recipe_1.getCookingtime());



        mockMvc.perform(delete("/demo/recipes/delete/{id}", response.get(response.size() - 1).getId()))
                .andExpect(status().isOk());


    }

    private List<Recipe> searchRecipe(String keyword) throws Exception {
        try {
            MvcResult mvcResult = mockMvc.perform(get("/demo/recipes/search/{title}", keyword))
                    .andReturn();

            List<Recipe> afterAdd = objectMapper.readValue(
                    mvcResult.getResponse().getContentAsString(),
                    objectMapper.getTypeFactory().constructParametricType(List.class, Recipe.class)
            );

            return afterAdd;

        } catch (Exception e) {
            System.out.println("Something went wrong with search." + e.getMessage() + " " + keyword);
            return null;
        }
    }
}



