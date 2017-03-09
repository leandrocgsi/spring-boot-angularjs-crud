package br.com.erudio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.erudio.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Student findByName(String name);

}
