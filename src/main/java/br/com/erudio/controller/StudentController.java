package br.com.erudio.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.erudio.model.Student;
import br.com.erudio.model.StudentId;
import br.com.erudio.service.StudentService;
import br.com.erudio.util.CustomErrorType;

@RestController
@SuppressWarnings("unchecked")
@RequestMapping("/api")
public class StudentController {

    public static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    StudentService studentService;

    @RequestMapping(value = "/student/", method = RequestMethod.GET)
    public ResponseEntity<List<Student>> listAllStudents() {
        List<Student> students = studentService.findAllStudents();
        if (students.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Student>>(students, HttpStatus.OK);
    }

    @RequestMapping(value = "/student/{id}/{registration}", method = RequestMethod.GET)
    public ResponseEntity<?> getStudent(@PathVariable("id") Integer id, @PathVariable("registration") String registration) {
        StudentId sdid = new StudentId();
        sdid.setId(id);
        sdid.setRegistration(registration);
        logger.info("Fetching Student with id {}", sdid);
        Student student = studentService.findById(sdid);
        if (student == null) {
            logger.error("Student with id {} not found.", sdid);
            return new ResponseEntity(new CustomErrorType("Student with id " + sdid  + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }

    @RequestMapping(value = "/student/", method = RequestMethod.POST)
    public ResponseEntity<?> createStudent(@RequestBody Student student, UriComponentsBuilder ucBuilder) {
        logger.info("Creating Student : {}", student);

        if (studentService.isStudentExist(student)) {
            logger.error("Unable to create. A Student with name {} already exist", student.getName());
            return new ResponseEntity(new CustomErrorType("Unable to create. A Student with name " + 
            student.getName() + " already exist."),HttpStatus.CONFLICT);
        }
        studentService.saveStudent(student);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/student/{id}").buildAndExpand(student.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/student/{id}/{registration}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateStudent(@PathVariable("id") Integer id, @PathVariable("registration") String registration, @RequestBody Student student) {
        StudentId sdid = new StudentId();
        sdid.setId(id);
        sdid.setRegistration(registration);
        
        logger.info("Updating Student with id {}", sdid);

        Student currentStudent = studentService.findById(sdid);

        if (currentStudent == null) {
            logger.error("Unable to update. Student with id {} not found.", sdid);
            return new ResponseEntity(new CustomErrorType("Unable to upate. Student with id " + sdid + " not found."),
                    HttpStatus.NOT_FOUND);
        }

        currentStudent.setName(student.getName());

        studentService.updateStudent(currentStudent);
        return new ResponseEntity<Student>(currentStudent, HttpStatus.OK);
    }

    @RequestMapping(value = "/student/{id}/{registration}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteStudent(@PathVariable("id") Integer id, @PathVariable("registration") String registration) {
        StudentId sdid = new StudentId();
        sdid.setId(id);
        sdid.setRegistration(registration);
        
        logger.info("Fetching & Deleting Student with id {}", id);

        Student student = studentService.findById(sdid);
        if (student == null) {
            logger.error("Unable to delete. Student with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("Unable to delete. Student with id " + id + " not found."), HttpStatus.NOT_FOUND);
        }
        studentService.deleteStudentById(sdid);
        return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/student/", method = RequestMethod.DELETE)
    public ResponseEntity<Student> deleteAllStudents() {
        logger.info("Deleting All Students");

        studentService.deleteAllStudents();
        return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
    }

}