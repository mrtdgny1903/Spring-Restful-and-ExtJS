package com.websystique.springboot.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.util.UriComponentsBuilder;

import com.websystique.springboot.model.Employee;
import com.websystique.springboot.service.EmployeeService;
import com.websystique.springboot.util.CustomErrorType;

@RestController
//@RequestMapping("/")
public class EmployeeController extends Employee {
	
	public int id;
	
	
	

	
	@Configuration
    @EnableWebMvc
    public class WebConfig extends WebMvcConfigurerAdapter {

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**")
				.allowedOrigins("http://localhost:1841","*")
				.allowedMethods("POST","GET","PUT","DELETE");
		}
	}

	public static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

	@Autowired
	EmployeeService employeeService; //Service which will do all data retrieval/manipulation work

	// -------------------Retrieve All Employees---------------------------------------------

	@RequestMapping(value = "/employee", method = RequestMethod.GET,produces="application/json")
	public ResponseEntity<List<Employee>> listAllEmployees() {
		List<Employee> employees = employeeService.findAllEmployees();
		if (employees.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
	}

	// -------------------Retrieve Single Employee------------------------------------------

	@RequestMapping(value = "/employee/{id}", method = RequestMethod.GET,produces="application/json")
	public ResponseEntity<?> getEmployee(@PathVariable("id") long id) {
		logger.info("Fetching Employee with id {}", id);
		Employee employee = employeeService.findById(id);
		if (employee == null) {
			logger.error("Employee with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Employee with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}

	// -------------------Create an Employee-------------------------------------------

	@RequestMapping(value = "/employee/", method = RequestMethod.POST,produces="application/json")
	public ResponseEntity<?> createEmployee(@RequestBody Employee employee, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Employee : {}", employee);
		
		
		/*if (userEmployee.isEmployeeExist(employee)) {
			logger.error("Unable to create. A Employee with name {} already exist", employee.getName());
			return new ResponseEntity(new CustomErrorType("Unable to create. A Employee with name " + 
			employee.getName() + " already exist."),HttpStatus.CONFLICT);
		}
		*/
		employeeService.saveEmployee(employee);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/employee/{id}").buildAndExpand(employee.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);
		
	}

	// -------------------------- Update an Employee ------------------------------------------------
	@RequestMapping(value = "/employee/{id}", method = RequestMethod.PUT,produces="application/json")
	public ResponseEntity<?> updateEmployee(@PathVariable("id") long id, @RequestBody Employee employee) {
		logger.info("Updating Employee with id {}", id);

		Employee currentEmployee = employeeService.findById(id);

		if (currentEmployee == null) {
			logger.error("Unable to update. Employee with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to update. Employee with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

		currentEmployee.setName(employee.getName());
		currentEmployee.setLastName(employee.getLastName());
		currentEmployee.setActive(employee.getActive());

		employeeService.updateEmployee(currentEmployee);
		return new ResponseEntity<Employee>(currentEmployee, HttpStatus.OK);
	}

	// ------------------- Delete an Employee-----------------------------------------

	@RequestMapping(value = "/employee/{id}", method = RequestMethod.DELETE,produces="application/json")
	public ResponseEntity<?> deleteEmployee(@PathVariable("id") long id) {
		logger.info("Fetching & Deleting Employee with id {}", id);

		Employee employee = employeeService.findById(id);
		if (employee == null) {
			logger.error("Unable to delete. Employee with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to delete. Employee with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		employeeService.deleteEmployeeById(id);
		return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
	}

	// ------------------- Delete All Employees-----------------------------

	@RequestMapping(value = "/employee/", method = RequestMethod.DELETE,produces="application/json")
	public ResponseEntity<Employee> deleteAllEmployees() {
		logger.info("Deleting All Employees");
		
		
		employeeService.deleteAllEmployees();
		return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
		
	}
	
	

}