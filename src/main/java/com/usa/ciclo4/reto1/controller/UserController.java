package com.usa.ciclo4.reto1.controller;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class UserController {

	/**
	 * Ruta de inicio, principal
	 * 
	 * @param model
	 * @return String path
	 */
	@GetMapping({ "/", "/login" })
	public String formLogin(Model model) {
		/**
		 * Verifica que el usuario no haya inicado sesion para que le envie al
		 * login,sino, directamente dentro a la aplicacion
		 */
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
			return "vistas/login";
		}
		log.info("El usuario ya esta autenticado, redirigiendo a login_success...");
		return "redirect:/login_success";

	}

	/**
	 * Presenta el formulario de registro de usuario
	 * 
	 * @param model
	 * @return String path
	 */
	@GetMapping("/register")
	public String formRegistro(Model model) {
		log.info("Mostrando la pagina de registro de nuevo usuario");
		return "vistas/crearCuenta";
	}

	/**
	 * Regresa la vista de login exitoso
	 * 
	 * @return String path
	 */
	@GetMapping("/login_success")
	public String loginExitoso() {
		log.info("Se muestra la vista de login exitoso");
		return "vistas/login_success";
	}
}
