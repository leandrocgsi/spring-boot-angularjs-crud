package br.com.erudio.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class StudentId implements Serializable{

    private static final long serialVersionUID = 1L;

    @Column(name="CPF", nullable=false, length = 12 )
    private Integer id;
    
    @Column(name="MATRICULA", nullable=false, length = 20 )
    private String registration;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRegistration() {
        return registration;
    }

    public void setRegistration(String registration) {
        this.registration = registration;
    }

    @Override
    public String toString() {
        return "StudentId [id=" + id + ", registration=" + registration + "]";
    }
}
