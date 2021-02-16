package com.juanmabu.imagenes.servicios;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.juanmabu.imagenes.modelos.Imagen;
import java.io.IOException;
import java.net.URL;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Juan Buffa
 */
@Service("servicioAmazonS3")
public class ServicioAmazonS3 implements ServicioAlmacenamiento {

    @Autowired
    AmazonS3 amazonS3;

    @Value("${bucket.name}")
    private String bucketName;

    @Override
    public void guardarImagen(String identidad, String nombreImagen, MultipartFile file) {

        if (file.isEmpty()) {
            throw new IllegalStateException("No se puede subir un arhivo vacio");
        }

        String extension = file.getOriginalFilename().split("\\.")[1];
        String nombreArchivo = nombreImagen + "." + extension;

        if (amazonS3.doesObjectExist(getDirectorio(identidad), nombreArchivo)) {
            throw new IllegalStateException("Ya existe un archivo " + extension + " con ese nombre, ponele uno distinto");
        }
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        try {
            amazonS3.putObject(getDirectorio(identidad), nombreArchivo, file.getInputStream(), metadata);
        } catch (IOException ex) {
            throw new IllegalStateException("Error al guardar la imagen");
        }
    }

    @Override
    public List<Imagen> descargarImagenes(String identidad) {
        String[] identidadPartes = identidad.split("\\|");
        String directorio = identidadPartes[0] + "/" + identidadPartes[1];
        ListObjectsV2Result listObjectsV2Result = amazonS3.listObjectsV2(bucketName, directorio);
        List<Imagen> imagenes = listObjectsV2Result.getObjectSummaries().stream().map(objeto -> {
            String url = getPresignedURL(objeto.getKey());
            //Como no se modifica nunca, la fecha de última modificacion coincide con la de creación
            Date fechaCreacion = objeto.getLastModified();
            Imagen imagen = new Imagen(objeto.getKey().split("\\/")[2], url, fechaCreacion);
            return imagen;

        }).collect(Collectors.toList());
        Collections.sort(imagenes);
        return imagenes;
    }

    public String getPresignedURL(String objectKey) {
        try {
            Date expiracion = new Date();
            long expTimeMillis = expiracion.getTime();
            expTimeMillis += 1000 * 60 * 60 * 12;
            expiracion.setTime(expTimeMillis);
            GeneratePresignedUrlRequest generatePresignedUrlRequest
                    = new GeneratePresignedUrlRequest(bucketName, objectKey)
                            .withMethod(HttpMethod.GET)
                            .withExpiration(expiracion);
            URL url = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);
            return url.toString();
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void borrarImagen(String identidad, String nombre) {
        amazonS3.deleteObject(getDirectorio(identidad), nombre);
    }

    private String getDirectorio(String identidad) {
        String[] identidadPartes = identidad.split("\\|");
        String directorio = bucketName + "/" + identidadPartes[0] + "/" + identidadPartes[1];
        return directorio;
    }

}
