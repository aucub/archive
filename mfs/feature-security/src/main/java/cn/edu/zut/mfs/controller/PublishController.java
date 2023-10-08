package cn.edu.zut.mfs.controller;

import cn.edu.zut.mfs.domain.ForwardMessage;
import cn.edu.zut.mfs.service.PublishService;
import cn.edu.zut.mfs.service.PublishStreamService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Slf4j
@RestController
public class PublishController {

    private PublishStreamService publishStreamService;

    private PublishService publishService;

    @Autowired
    public void setPublishService(PublishService publishService) {
        this.publishService = publishService;
    }

    @Autowired
    public void setPublishStreamService(PublishStreamService publishStreamService) {
        this.publishStreamService = publishStreamService;
    }


    @MessageMapping("publish1")
    public Mono<String> publish(Mono<String> body) {
        System.out.println(body);
        return body;
    }

    @MessageMapping("publish")
    public Flux<String> publish(@Payload String s) {
      /*  System.out.println("------------------------------------------------------------"+s);
        //publishService.publish(forwardMessage);
        //return Mono.just("messageId:" + forwardMessage.getId() + "已投递");
        return Mono.just("-------------------------------------------------soudao"+s);
*/
        return Flux.interval(Duration.ofNanos(10000000))
                .map(index -> new String("----------------------test"+index))
                .log();
    }

    @MessageMapping("publishStream")
    public Mono<String> publishStream(ForwardMessage forwardMessage) {
        publishStreamService.publish(forwardMessage);
        return Mono.just("messageId:" + forwardMessage.getId() + "已投递");
    }
}
