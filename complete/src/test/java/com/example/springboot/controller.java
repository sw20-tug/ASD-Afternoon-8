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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    public void delete_recipe() throws Exception {
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
        mockMvc.perform(get("/demo/recipes/delete/{id}", recipe_2.getId()))
                .andExpect(status().isOk());
        MvcResult mvcResult2 = mockMvc.perform(get("/demo/recipes"))
                .andReturn();
        String responseData2 = mvcResult2.getResponse().getContentAsString();
        assertThat(responseData.length()).isNotEqualTo(responseData2.length());
    }
}

