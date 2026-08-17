package mancala.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {

    public static void main(String[] args) {
        // Dit doet op de achtergrond precies wat de createServer() en start() deden in het voorbeeld!
        SpringApplication.run(App.class, args);

        System.out.println("Started Spring Boot server.");
        System.out.println("Listening on http://localhost:8080/");
        System.out.println("Press CTRL+C to exit.");
    }
}