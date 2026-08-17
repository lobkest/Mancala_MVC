package mancala.api.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class MancalaControllerTest {

    private MancalaController controller;

    @BeforeEach
    public void setUp() {
        controller = new MancalaController();
    }

    @Test
    public void startingMancalaIsAllowed() {
        Map<String, Object> response = controller.start();

        assertNotNull(response);
        assertTrue(response.containsKey("stonesArray"));
    }

    @Test
    public void startingMancalaReturnsAGameWithoutAWinner() {
        Map<String, Object> response = controller.start();
        assertEquals(-1, response.get("winner"));
    }

    @Test
    public void startingMancalaReturnsThePits() {
        Map<String, Object> response = controller.start();

        int[] stonesArray = (int[]) response.get("stonesArray");

        assertEquals(14, stonesArray.length);
        assertEquals(4, stonesArray[0]);
    }

    @Test
    public void playingABowlIsAllowed() {
        controller.start();

        ResponseEntity<?> response = controller.play(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void playingABowlYieldsAnUpdatedGameState() {
        controller.start();

        ResponseEntity<?> response = controller.play(1);

        @SuppressWarnings("unchecked")
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        int[] stonesArray = (int[]) responseBody.get("stonesArray");

        assertEquals(0, stonesArray[0]);
        assertEquals(5, stonesArray[1]);
        assertEquals(5, stonesArray[2]);
        assertEquals(5, stonesArray[3]);
        assertEquals(5, stonesArray[4]);
        assertEquals(4, stonesArray[5]);
    }

    @Test
    public void playingAnEmptyBowlReturnsBadRequest() {
        controller.start();

        controller.play(1);

        ResponseEntity<?> response = controller.play(1);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}