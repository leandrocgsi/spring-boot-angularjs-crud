package br.com.erudio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.erudio.model.Course;

@Repository
public interface StudentRepository extends JpaRepository<Course, Long> {

    Course findByName(String name);

}
