package com.ropa.tumtumclothing.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ropa.tumtumclothing.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreoUsuario(String correoUsuario);
}

