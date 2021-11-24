package com.usa.ciclo4.reto1.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usa.ciclo4.reto1.model.User;
import com.usa.ciclo4.reto1.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repo;

	@Override
	public boolean isEmailNotInUse(User user) throws Exception {
		Optional<User> userByEmail = repo.buscarPorEmail(user.getEmail());
		if (userByEmail.isPresent()) {
			throw new Exception("El email proporcionado ya se encuentra en uso");
		}

		return true;
	}

	@Override
	public void createUser(User user) {
		repo.guardarUsuario(user);
	}

	@Override
	public List<User> listUsers() {
		return repo.traerUsuarios();
	}

	@Override
	public User verificaUsuario(String email, String password) {
		Optional<User> userAux = repo.buscarPorEmail(email);
		User userNotFound = new User();
		userNotFound.setId(null);
		userNotFound.setEmail(email);
		userNotFound.setPassword(password);
		userNotFound.setName("NO DEFINIDO");

		if (userAux.isPresent()) {
			return userAux.get();

		}
		return userNotFound;

	}

	@Override
	public boolean existeUsuarioPorEmail(String email) {
		return repo.buscarPorEmail(email).isPresent();
	}
}
