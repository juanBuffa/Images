package com.juanmabu.imagenes.servicios;

/**
 *
 * @author Juan Buffa
 */

//Creado para hacer testeos al principio del desarrollo, reemplazado por "ServicioAmazonS3" para facilitar la subida del backend a la nube

/*
@Service("servicioSistemaArchivos")
public class ServicioSistemaArchivos implements ServicioAlmacenamiento {

    @Override
    public void guardarImagen(String identidad, String nombreImagen, MultipartFile multipartFile) {

        if (multipartFile.isEmpty()) {
            throw new IllegalStateException("No se puede subir un arhivo vacio");
        }

        if (!Arrays.asList("image/jpeg", "image/png", "image/gif").contains(multipartFile.getContentType())) {
            throw new IllegalStateException("El Archivo no es una imagen");
        }

        File directorio = getDirectorio(identidad);

        if (!directorio.exists()) {
            directorio.mkdir();
        }

        File archivo = new File(directorio + "/" + nombreImagen + "." + multipartFile.getOriginalFilename().split("\\.")[1]);

        if (archivo.exists()) {
            throw new IllegalStateException("Ya existe un archivo con ese nombre");
        }

        try {
            archivo.createNewFile();
            OutputStream os = new FileOutputStream(archivo);
            os.write(multipartFile.getBytes());
            os.close();

        } catch (IOException ex) {
            Logger.getLogger(ServicioSistemaArchivos.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    @Override
    public List<Imagen> descargarImagenes(String identidad) {

        File directorio = getDirectorio(identidad);

        if (!directorio.exists()) {
            return null;
        }
        ArrayList<Imagen> imagenes = new ArrayList<>();

        Arrays.asList(directorio.listFiles()).stream().forEach(imagen -> {
            try {
                imagenes.add(new Imagen(imagen.getName(), FileUtils.readFileToByteArray(imagen)));
            } catch (IOException ex) {
                Logger.getLogger(ServicioSistemaArchivos.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        );

        return imagenes;
    }

    @Override
    public void borrarImagen(String identidad, String nombre) {
        File imagenABorrar = new File(getDirectorio(identidad) + "/" + nombre);
        imagenABorrar.delete();
    }

    private File getDirectorio(String identidad) {
        String[] identidadPartes = identidad.split("\\|");
        File directorio = new File("../imagenesGuardadas/" + identidadPartes[0] + "/" + identidadPartes[1]);
        return directorio;
    }

}
*/
