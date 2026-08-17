package mancala.api.controllers;

import nl.sogyo.mancala.domain.Facade;
import nl.sogyo.mancala.domain.exceptions.CanNotPlayThisPocket;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Staat React toe om te praten met deze server
public class MancalaController {

    private final Facade facade;

    public MancalaController() {
        this.facade = new Facade();
    }

    // Komt overeen met de /start methode uit het voorbeeld
    @GetMapping("/start")
    public Map<String, Object> start() {
        // Initialiseer het spel via jouw Facade
        facade.startGame();

        // Geef jouw Map met de status terug (Spring Boot maakt hier automatisch JSON van!)
        return facade.getPocketsStatus();
    }

    // Komt overeen met de /play methode uit het voorbeeld
    @PostMapping("/move/{pocketNr}")
    public ResponseEntity<?> play(@PathVariable("pocketNr") int pocketNr) {
        try {
            // Speel een kuiltje via jouw Facade
            facade.setMoveStones(pocketNr);

            // Geef de nieuwe status terug in een 200 OK response
            return ResponseEntity.ok(facade.getPocketsStatus());

        } catch (CanNotPlayThisPocket e) {
            // Als er in het domein iets fout gaat, vangen we dat hier netjes op
            // Dit voorkomt de 500 Server Error waar je eerder tegenaan liep!
            return ResponseEntity.badRequest().body("Ongeldige zet: " + e.getMessage());
        }
    }
}