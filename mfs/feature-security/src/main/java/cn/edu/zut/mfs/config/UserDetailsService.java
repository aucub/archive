package cn.edu.zut.mfs.config;

import cn.edu.zut.mfs.service.LoginAuthService;
import cn.edu.zut.mfs.service.UserService;
import cn.edu.zut.mfs.utils.EncryptUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Configuration
@Service
@Slf4j
public class UserDetailsService implements ReactiveUserDetailsService{

    private LoginAuthService loginAuthService;
    private UserService userService;

    @Autowired
    public void setLoginAuthService(LoginAuthService loginAuthService) {
        this.loginAuthService = loginAuthService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }


    public Mono<UserDetails> findByUsername(String username) {
        EncryptUtils.init();
        log.warn("----------------------------"+new String(loginAuthService.getPassword(username)));
        log.warn("--------------------------"+userService.getPermissions(username).get(0).toString());
        log.warn("----------------------------"+username);
        return Mono.just(new User(username, loginAuthService.getPassword(username), userService.getPermissions(username)));
    }
}
