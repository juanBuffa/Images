package com.juanmabu.imagenes.configuracion;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author Juan Buffa
 */
@Configuration
public class AmazonConfig {

    @Value("${access.key}")
    private String AccessKey;

    @Value("${secret.key}")
    private String SecretKey;

    @Bean
    public AmazonS3 s3() {
        AWSCredentials awscredentials = new BasicAWSCredentials(AccessKey, SecretKey);
        return AmazonS3ClientBuilder.standard().withRegion("sa-east-1").withCredentials(new AWSStaticCredentialsProvider(awscredentials)).build();
    }

}
