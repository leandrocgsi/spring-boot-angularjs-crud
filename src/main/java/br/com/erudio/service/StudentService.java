package br.com.erudio.service;


import java.util.List;

import br.com.erudio.model.Student;
import br.com.erudio.model.StudentId;

public interface StudentService {
    
    Student findById(StudentId id);

    Student findByName(String name);

    void saveStudent(Student student);

    void updateStudent(Student student);

    void deleteStudentById(StudentId id);

    void deleteAllStudents();

    List<Student> findAllStudents();

    boolean isStudentExist(Student student);
}