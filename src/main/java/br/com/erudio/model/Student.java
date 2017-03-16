package br.com.erudio.model;

import java.io.Serializable;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="TBL_ALUNO")
public class Student implements Serializable{

    private static final long serialVersionUID = 1L;

    @AttributeOverrides({
        @AttributeOverride(name="id", column=@Column(name="CPF")),
        @AttributeOverride(name="registration", column=@Column(name="MATRICULA"))
    })
    @EmbeddedId StudentId id;

    @NotEmpty
    @Column(name="NOME", nullable=false)
    private String name;
    
    @OneToOne
    @JoinColumn(name = "CURSO_ID", referencedColumnName="ID", foreignKey = @ForeignKey(name = "FK_TBL_ALUN_REF_TBL_CURS"))
    private Course course;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public StudentId getId() {
        return id;
    }

    public void setId(StudentId id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((course == null) ? 0 : course.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;
        Student other = (Student) obj;
        if (course == null) {
            if (other.course != null) return false;
        } else if (!course.equals(other.course)) return false;
        if (id == null) {
            if (other.id != null) return false;
        } else if (!id.equals(other.id)) return false;
        if (name == null) {
            if (other.name != null) return false;
        } else if (!name.equals(other.name)) return false;
        return true;
    }

    @Override
    public String toString() {
        return "Student [id=" + id + ", name=" + name + ", course=" + course + "]";
    }
}