package cn.edu.zut.mfs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j//org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration.class
@SpringBootApplication(exclude = {})
public class MfsApplication {

    public static void main(String[] args) {
        SpringApplication.run(MfsApplication.class, args);
    }

}
