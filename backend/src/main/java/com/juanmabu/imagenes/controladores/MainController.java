package com.juanmabu.imagenes.controladores;

import com.juanmabu.imagenes.modelos.Imagen;
import com.juanmabu.imagenes.servicios.ServicioAlmacenamiento;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Juan Buffa
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${application.origin}")
public class MainController {

    @Autowired
    @Qualifier("servicioAmazonS3")
    ServicioAlmacenamiento servicioAlmacenamiento;

    @GetMapping("/imagenes/descargar")
    public List<Imagen> getImagenesTodas(Principal principal) {
        JwtAuthenticationToken jwt = (JwtAuthenticationToken) principal;
        String identidad = (String) jwt.getTokenAttributes().get("sub");
        return servicioAlmacenamiento.descargarImagenes(identidad);
    }

    @PostMapping(path = "/imagen/subir", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String postImagen(@RequestParam("file") MultipartFile file,
            @RequestParam("nombre") String nombreImagen, Principal principal) {
        JwtAuthenticationToken jwt = (JwtAuthenticationToken) principal;
        String identidad = (String) jwt.getTokenAttributes().get("sub");
        try {
            servicioAlmacenamiento.guardarImagen(identidad, nombreImagen, file);
        } catch (RuntimeException ex) {
            return ex.getMessage();
        }
        return "Imagen Subida Exitosamente";
    }

    @DeleteMapping(path = "/imagen/eliminar")
    public void deleteImagen(@RequestParam("nombre") String nombre, Principal principal) {
        JwtAuthenticationToken jwt = (JwtAuthenticationToken) principal;
        String identidad = (String) jwt.getTokenAttributes().get("sub");
        servicioAlmacenamiento.borrarImagen(identidad, nombre);
    }

}
