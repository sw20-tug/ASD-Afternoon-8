package com.example.springboot;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import  javax.validation.constraints.NotNull;

@Entity // This tells Hibernate to make a table out of this class
public class Steps {

	private Integer step_order;

	public Steps(){

	}

	public Integer getStep_order() {
		return step_order;
	}

	public void setStep_order(Integer step_order) {
		this.step_order = step_order;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getRecipeid() {
		return recipeid;
	}

	public void setRecipeid(Integer recipeid) {
		this.recipeid = recipeid;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Steps(Integer id, Integer recipeid, String description, String image, Integer step_order){
		this.id = id;
        this.recipeid = recipeid;
        this.description = description;
        this.image = image;
        this.step_order = step_order;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private Integer recipeid;

	//@Column(columnDefinition = "TEXT")
	//@NotBlank
	private String description;

	//@NotBlank
	private String image;

	
}