package cn.edu.zut.mfs.config;

import cn.edu.zut.mfs.domain.MetadataHeader;
import io.cloudevents.spring.codec.CloudEventDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.codec.cbor.Jackson2CborDecoder;
import org.springframework.http.codec.cbor.Jackson2CborEncoder;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.messaging.rsocket.RSocketStrategies;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.rsocket.EnableRSocketSecurity;
import org.springframework.security.config.annotation.rsocket.RSocketSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.rsocket.core.PayloadSocketAcceptorInterceptor;
import org.springframework.security.rsocket.metadata.SimpleAuthenticationEncoder;
import org.springframework.util.MimeType;
import org.springframework.web.util.pattern.PathPatternRouteMatcher;

import java.util.Map;


@Configuration
@EnableRSocketSecurity
@EnableReactiveMethodSecurity
public class RSocketConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    PayloadSocketAcceptorInterceptor authorization(RSocketSecurity security) {
        security.authorizePayload(authorize ->
                authorize
                        .setup().authenticated()
                        .anyExchange().permitAll()
                        .anyRequest().authenticated()
        ).simpleAuthentication(Customizer.withDefaults());
        ;
        return security.build();
    }

    @Bean
    public RSocketStrategies rsocketStrategies() {
        return RSocketStrategies.builder()
                .metadataExtractorRegistry(registry -> {
                    registry.metadataToExtract(
                            MimeType.valueOf("application/x.metadata+json"),
                            new ParameterizedTypeReference<Map<String, String>>() {
                            },
                            (jsonMap, outputMap) -> {
                                outputMap.putAll(jsonMap);
                            });
                    registry.metadataToExtract(MimeType.valueOf("application/x.meta+json"), MetadataHeader.class, "meta");
                    registry.metadataToExtract(MimeType.valueOf("application/x.token+json"), String.class, "satoken");
                })
                .encoders(encoders -> {
                    //encoders.add(new CloudEventEncoder());
                    encoders.add(new Jackson2CborEncoder());
                    encoders.add(new Jackson2JsonEncoder());
                    encoders.add(new SimpleAuthenticationEncoder());
                })
                .decoders(decoders -> {
                    decoders.add(new CloudEventDecoder());
                    decoders.add(new Jackson2CborDecoder());
                    decoders.add(new Jackson2JsonDecoder());
                })
                .routeMatcher(new PathPatternRouteMatcher())
                .dataBufferFactory(new DefaultDataBufferFactory(true))
                .build();
    }

}
