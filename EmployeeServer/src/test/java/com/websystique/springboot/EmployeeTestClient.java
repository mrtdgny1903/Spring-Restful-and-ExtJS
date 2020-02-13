package com.websystique.springboot;
 
import java.net.URI;
import java.util.LinkedHashMap;
import java.util.List;

import com.websystique.springboot.model.Employee;
import org.springframework.web.client.RestTemplate;
 

public class EmployeeTestClient {
 
    public static final String REST_SERVICE_URI = "http://localhost:8080/employee";
     
    /* GET */
    @SuppressWarnings("unchecked")
    private static void listAllEmployees(){
        System.out.println("Testing listAllEmployees API-----------");
         
        RestTemplate restTemplate = new RestTemplate();
        List<LinkedHashMap<String, Object>> employeesMap = restTemplate.getForObject(REST_SERVICE_URI+"/employee/", List.class);
         
        if(employeesMap!=null){
            for(LinkedHashMap<String, Object> map : employeesMap){
                System.out.println("Employee : id="+map.get("id")+", Name="+map.get("name")+", lastName="+map.get("lastName")+", Active="+map.get("active"));;
            }
        }else{
            System.out.println("No employee exist----------");
        }
    }
     
    /* GET */
    private static void getEmployee(){
        System.out.println("Testing getEmployee API----------");
        RestTemplate restTemplate = new RestTemplate();
        Employee employee = restTemplate.getForObject(REST_SERVICE_URI+"/employee/1", Employee.class);
        System.out.println(employee);
    }
     
    /* POST */
    private static void createEmployee() {
        System.out.println("Testing create Employee API----------");
        RestTemplate restTemplate = new RestTemplate();
        Employee employee = new Employee(0,"Sarah","asd","true");
        URI uri = restTemplate.postForLocation(REST_SERVICE_URI+"/employee/", employee, Employee.class);
        System.out.println("Location : "+uri.toASCIIString());
    }
 
    /* PUT */
    private static void updateEmployee() {
        System.out.println("Testing update Employee API----------");
        RestTemplate restTemplate = new RestTemplate();
        Employee employee  = new Employee(1,"Tomy","mony", "false");
        restTemplate.put(REST_SERVICE_URI+"/user/1", employee);
        System.out.println(employee);
    }
 
    /* DELETE */
    private static void deleteEmployee() {
        System.out.println("Testing delete Employee API----------");
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(REST_SERVICE_URI+"/employee/3");
    }
 
 
    /* DELETE */
    private static void deleteAllEmployees() {
        System.out.println("Testing all delete Employees API----------");
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(REST_SERVICE_URI+"/employee/");
    }
 
    public static void main(String args[]){
        listAllEmployees();
        getEmployee();
        createEmployee();
        listAllEmployees();
        updateEmployee();
        listAllEmployees();
        deleteEmployee();
        listAllEmployees();
        deleteAllEmployees();
        listAllEmployees();
    }
}