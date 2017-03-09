package br.com.erudio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.erudio.model.Course;
import br.com.erudio.repositories.CourseRepository;
import br.com.erudio.service.CourseService;



@Service("courseService")
@Transactional
public class CourseServiceImpl implements CourseService{

    @Autowired
    private CourseRepository courseRepository;

    public Course findById(Long id) {
        return courseRepository.findOne(id);
    }

    public Course findByName(String name) {
        return courseRepository.findByName(name);
    }

    public void saveCourse(Course course) {
        courseRepository.save(course);
    }

    public void updateCourse(Course course){
        saveCourse(course);
    }

    public void deleteCourseById(Long id){
        courseRepository.delete(id);
    }

    public void deleteAllCourses(){
        courseRepository.deleteAll();
    }

    public List<Course> findAllCourses(){
        return courseRepository.findAll();
    }

    public boolean isCourseExist(Course course) {
        return findByName(course.getName()) != null;
    }
}
