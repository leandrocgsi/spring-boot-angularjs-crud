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

import br.com.erudio.model.Course;
import br.com.erudio.service.CourseService;
import br.com.erudio.util.CustomErrorType;

@RestController
@RequestMapping("/api")
public class CourseController {

    public static final Logger logger = LoggerFactory.getLogger(CourseController.class);

    @Autowired
    CourseService courseService;

    @RequestMapping(value = "/course/", method = RequestMethod.GET)
    public ResponseEntity<List<Course>> listAllCourses() {
        List<Course> courses = courseService.findAllCourses();
        if (courses.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Course>>(courses, HttpStatus.OK);
    }

    @RequestMapping(value = "/course/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getCourse(@PathVariable("id") long id) {
        logger.info("Fetching Course with id {}", id);
        Course course = courseService.findById(id);
        if (course == null) {
            logger.error("Course with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("Course with id " + id  + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Course>(course, HttpStatus.OK);
    }

    @RequestMapping(value = "/course/", method = RequestMethod.POST)
    public ResponseEntity<?> createCourse(@RequestBody Course course, UriComponentsBuilder ucBuilder) {
        logger.info("Creating Course : {}", course);

        if (courseService.isCourseExist(course)) {
            logger.error("Unable to create. A Course with name {} already exist", course.getName());
            return new ResponseEntity(new CustomErrorType("Unable to create. A Course with name " + 
            course.getName() + " already exist."),HttpStatus.CONFLICT);
        }
        courseService.saveCourse(course);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/course/{id}").buildAndExpand(course.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/course/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateCourse(@PathVariable("id") long id, @RequestBody Course course) {
        logger.info("Updating Course with id {}", id);

        Course currentCourse = courseService.findById(id);

        if (currentCourse == null) {
            logger.error("Unable to update. Course with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("Unable to upate. Course with id " + id + " not found."),
                    HttpStatus.NOT_FOUND);
        }

        currentCourse.setName(course.getName());

        courseService.updateCourse(currentCourse);
        return new ResponseEntity<Course>(currentCourse, HttpStatus.OK);
    }

    @RequestMapping(value = "/course/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCourse(@PathVariable("id") long id) {
        logger.info("Fetching & Deleting Course with id {}", id);

        Course course = courseService.findById(id);
        if (course == null) {
            logger.error("Unable to delete. Course with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("Unable to delete. Course with id " + id + " not found."), HttpStatus.NOT_FOUND);
        }
        courseService.deleteCourseById(id);
        return new ResponseEntity<Course>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/course/", method = RequestMethod.DELETE)
    public ResponseEntity<Course> deleteAllCourses() {
        logger.info("Deleting All Courses");

        courseService.deleteAllCourses();
        return new ResponseEntity<Course>(HttpStatus.NO_CONTENT);
    }

}