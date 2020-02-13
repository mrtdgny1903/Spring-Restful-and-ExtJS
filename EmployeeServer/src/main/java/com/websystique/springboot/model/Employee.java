package com.websystique.springboot.model;
	
public class Employee {

	private long id;
	
	private String name;
	
	private String lastName;
	
	private String active;

	public Employee(){
		id=0;
	}
	
	public Employee(long id, String name, String lastName, String active){
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.active = active;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	public String getActive() {
		return active;
	}

	public void setName(String name) {
		this.name = name;
	}
	public void setActive(String active) {
		this.active= active;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	

	

	

	@Override
	public String toString() {
		return "Employee [name=" + name + ", last name=" + lastName
				+ ", active=" + active + "]";
	}


}
