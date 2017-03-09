package br.com.erudio.service;


import java.util.List;

import br.com.erudio.model.Student;

public interface StudentService {
    
    Student findById(Long id);

    Student findByName(String name);

    void saveStudent(Student student);

    void updateStudent(Student student);

    void deleteStudentById(Long id);

    void deleteAllStudents();

    List<Student> findAllStudents();

    boolean isStudentExist(Student student);
}