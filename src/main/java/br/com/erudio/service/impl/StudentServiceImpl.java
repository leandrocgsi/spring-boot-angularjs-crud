package br.com.erudio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.erudio.model.Student;
import br.com.erudio.model.StudentId;
import br.com.erudio.repositories.StudentRepository;
import br.com.erudio.service.StudentService;



@Service("studentService")
@Transactional
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentRepository studentRepository;

    public Student findById(StudentId id) {
        return studentRepository.findOne(id);
    }

    public Student findByName(String name) {
        return studentRepository.findByName(name);
    }

    public void saveStudent(Student student) {
        studentRepository.save(student);
    }

    public void updateStudent(Student student){
        saveStudent(student);
    }

    public void deleteStudentById(StudentId id){
        studentRepository.delete(id);
    }

    public void deleteAllStudents(){
        studentRepository.deleteAll();
    }

    public List<Student> findAllStudents(){
        return studentRepository.findAll();
    }

    public boolean isStudentExist(Student student) {
        return findByName(student.getName()) != null;
    }
}
