package com.usa.ciclo4.reto1.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 7233856453730961959L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(unique = true,nullable=false)
	private String email;
	
	@Column(length = 40,nullable=false)
	private String password;
	
	@Column(length = 80,nullable=false)
	private String name;


	/**
	 * Constructor
	 * 
	 * @param email
	 * @param name
	 * @param password
	 */
	public User(String email, String password, String name, String confirmPassword) {
		this.email = email;
		this.password = password;
		this.name = name;
	}

}
