package br.com.erudio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.erudio.model.Student;
import br.com.erudio.model.StudentId;

@Repository
public interface StudentRepository extends JpaRepository<Student, StudentId> {

    Student findByName(String name);

}
