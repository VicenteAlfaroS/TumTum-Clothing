package com.ropa.tumtumclothing.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ropa.tumtumclothing.entities.Usuario;
import com.ropa.tumtumclothing.services.UsuarioService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tumtum/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public List<Usuario> List(){
        return service.findByAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> verDetalle(@PathVariable Long id){
        Optional<Usuario> usuarioOptional = service.findById(id);
        if(usuarioOptional.isPresent()){
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario unUsuario){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(unUsuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(@PathVariable Long id, @RequestBody Usuario unUsuario){
        Optional<Usuario> usOptional = service.findById(id);
        if(usOptional.isPresent()){
            Usuario usExistente = usOptional.get();
            usExistente.setApellidosUsuario(unUsuario.getApellidosUsuario());
            usExistente.setComunaUsuario(unUsuario.getComunaUsuario());
            usExistente.setContraseniaUsuario(unUsuario.getContraseniaUsuario());
            usExistente.setCorreoUsuario(unUsuario.getCorreoUsuario());
            usExistente.setDireccionUsuario(unUsuario.getDireccionUsuario());
            usExistente.setEstadoUsuario(unUsuario.getEstadoUsuario());
            usExistente.setFechaCreacionUsuario(unUsuario.getFechaCreacionUsuario());
            usExistente.setNacimientoUsuario(unUsuario.getNacimientoUsuario());
            usExistente.setNombreUsuario(unUsuario.getNombreUsuario());
            usExistente.setRegionUsuario(unUsuario.getRegionUsuario());
            usExistente.setRolUsuario(unUsuario.getRegionUsuario());
            usExistente.setRutUsuario(unUsuario.getRutUsuario());
            Usuario usModificado = service.save(usExistente);
            return ResponseEntity.ok(usModificado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        Usuario unUsuario = new Usuario();
        unUsuario.setIdUsuario(id);
        Optional<Usuario> usuarioOptional = service.delete(unUsuario);
        if(usuarioOptional.isPresent()){
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Usuario unUsuario) {
        Optional<Usuario> existente = service.findByCorreo(unUsuario.getCorreoUsuario());
        if (existente.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Correo ya registrado");
        }

        Usuario nuevo = service.save(unUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {
        String correo = datos.get("correoUsuario");
        String contrasenia = datos.get("contraseniaUsuario");

        Optional<Usuario> usuarioOptional = service.findByCorreo(correo);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (usuario.getContraseniaUsuario().equals(contrasenia)) {
                return ResponseEntity.ok(usuario);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }
    
    @GetMapping("/activo")
    public ResponseEntity<?> obtenerUsuarioActivo() {
        Optional<Usuario> usuarioOptional = service.findById(2L);
        if (usuarioOptional.isPresent()) {
            return ResponseEntity.ok(usuarioOptional.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario activo no encontrado");
    }

}
