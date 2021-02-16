package com.juanmabu.imagenes.servicios;

import com.juanmabu.imagenes.modelos.Imagen;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Juan Buffa
 */
public interface ServicioAlmacenamiento {

    public void guardarImagen(String identidad, String nombreImagen, MultipartFile file);

    public List<Imagen> descargarImagenes(String identidad);

    public void borrarImagen(String identidad, String nombre);

}
