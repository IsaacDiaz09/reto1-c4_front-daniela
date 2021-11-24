package com.usa.ciclo4.reto1.service;

import java.util.List;

import com.usa.ciclo4.reto1.model.User;

public interface UserService {
	/**
	 * Verifica que el email proporcionado no se encuentre en uso por otro usuario
	 * 
	 * @param user
	 * @return boolean
	 * @throws Exception
	 */
	boolean isEmailNotInUse(User user) throws Exception;

	/**
	 * Persiste el obj usuario una vez validado
	 * 
	 * @param user
	 * @throws Exception
	 */
	void createUser(User user) throws Exception;

	/**
	 * 
	 * @return List
	 */
	List<User> listUsers();

	/**
	 * metodo a llamar por el rest controler, genera respuesta de si un usuario
	 * existe o no
	 * 
	 * @param email
	 * @param password
	 * @return User
	 */
	User verificaUsuario(String email, String password);
	
	/**
	 * revisa si un usario existe por email
	 * @param email
	 * @return boolean
	 */
	boolean existeUsuarioPorEmail(String email);
}
