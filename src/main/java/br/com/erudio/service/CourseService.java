package br.com.erudio.service;


import java.util.List;

import br.com.erudio.model.Course;

public interface CourseService {
    
    Course findById(Long id);

    Course findByName(String name);

    void saveCourse(Course course);

    void updateCourse(Course course);

    void deleteCourseById(Long id);

    void deleteAllCourses();

    List<Course> findAllCourses();

    boolean isCourseExist(Course course);
}