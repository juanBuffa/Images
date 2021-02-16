package com.juanmabu.imagenes.modelos;

import java.util.Date;

/**
 *
 * @author Juan Buffa
 */
public class Imagen implements Comparable<Imagen>{

    private final String nombre;
    private final String url;
    private final Date fechaCreacion;

    public Imagen(String nombre, String url, Date fechaCreacion) {
        this.nombre = nombre;
        this.url = url;
        this.fechaCreacion = fechaCreacion;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public String getUrl() {
        return url;
    }

    public String getNombre() {
        return nombre;
    }

    @Override
    public int compareTo(Imagen ima) {
        if(this.fechaCreacion.compareTo(ima.getFechaCreacion())==-1){
            return 1;
        }
        if(this.fechaCreacion.compareTo(ima.getFechaCreacion())==1){
            return -1;
        }
        return 0;
    }
    

}
