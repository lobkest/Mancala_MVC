# Mancala MVC

This project is the continuation of [Mancala](https://github.com/lobkest/Mancala), built as part of a traineeship project at Sogyo.

## About the project

After spending a week getting familiar with front-end development, the existing domain logic from the original Mancala project was extended with a **front end** and **API layer**, turning the domain-only implementation into a fully playable game.

## Structure

- **`domain`** – the core game logic (originally built with TDD, carried over from the Mancala project)
- **`api`** – exposes the domain logic through REST endpoints
- **`client`** – the front end that lets users actually play the game
