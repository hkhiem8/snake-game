# Snake Game Project

This is a classic game of snake built using JavaScript, HTML, and CSS. I chose to do this project out of mid-2000s nostalgia and also a desire to further my understanding of programming. In order to develop this game, I had to research a myriad of animation techniques in JS. I decided to use canvas and requestAnimationFrame/cancelAnimationFrame because it is considered the gold standard of JS animation, plus I felt that it was the most intuitive.

Though this project, I was also able to practice problem solving skills, taking ideas from 0 to 1, and 1+.

![hkhiem8 github io_snake-game_](https://github.com/hkhiem8/snake-game/assets/88019192/f251cbe6-271e-4c68-bfbe-b87e30d4d808)

## Getting Started

Here is the deployed game:

https://hkhiem8.github.io/snake-game/

The rules are simple:
- Press spacebar to start the game
- Press P to pause/resume the game
- Use your arrow keys to control the snake
- Eat fruits to gain points and grow the snake
- If the snake hits itself or the wall, game over
- Get 5 points to win the game

## Planning Process

I started out with the following user stories:

- As a user, I want to see a landing page when I arrive at the website to know I’m in the right place
- As a user, I want to see clear instructions and rules on the landing page so I know how to play the game
- As a user, I want to be able to use my arrow keys to control the snake
- As a user, I want to see a scoreboard on the top of the landing page so I know how many points I have scored
- As a user, I want to see the top 3 highest scores during my session so that I can compare
- As a user, I want to see fruit appear in randomly generated locations on the board so that I know where to navigate my snake and have a challenge
- As a user, I want to see the snake grow by one increment when it eats a fruit to increase the difficulty as the game goes on
- As a user, I want to see the score increase each time the snake eats a fruit so I can add to my high score
- As a user, I want the game to end when the snake hits the edge of the board or itself, so the game doesn’t go on forever

And the following pseudocode:

Variables for the game

- snake,
- directions (up, down, right, left)
- fruit
- score
- high score

Functions

- function that initializes the game state: sets default snake direction, generates fruit at a random place on the map, resets the score to 0,
- function to generate a random position for the fruit and render it (fruit position ! = snake position)
- function to move the snake in a direction (controlled by arrow keys) at a set speed
- function to update the game state on each snake movement frame
- function to grow the snake when it eats fruit
- function to check if the snake has collided with the map edge or itself
- function to update and display the current score
- function to render the game state
- function to end the game and update the high score (if current score > high score)

Event listeners

- keyboard controls: arrow keys change directions for the snake

Data structure

- The board is divided up in a 10x10 matrix, with each element representing a coordinate
- the snake is an array, with the head being the start of the array and vice versa
- the fruit randomly spawns as a coordinate in the 10x10 matrix
- each time the head of the snake = fruit, an element is added to the array
- unshift, the last coordinate that the tail was equal to
- whenever the snake grows, the score is updated (array.length)
- when the head of the snake = any other coordinate in the snake array, the game ends
- when any part of the snake = the edge coordinates, the game ends

While this was a great start, I quickly realized that I had no idea how to animate the frames using this data structure. I was researching ways such as setInterval, and requestAnimationFrame.

## Attributions

My project is heavily influenced by the codebase from Straker's Github page 

https://gist.github.com/straker/ff00b4b49669ad3dec890306d348adc4#file-snake-html-L63-L66 . 

I analysed this codebase line by line to understand JS animation and the data structure of a snake game. While some components of my game were built from Straker's oriignal codebase, I can confidently say that I understand all components and have adapted and organized each function in a way that makes sense to me.

To make this project my own, I added/updated the following features:
- game state management using cancelAnimationFrame
- start/pause functionality
- score and highscore functionality
- a win condition where if the snake eats 5 fruits, a winning message is displayed
- a new handleKeyPress function using switch case, and event.key
- my own HTML/CSS design

This codebase was a great reference and helped me navigate my research on JS animations. I researched each component, and used the following resources to aid my understanding.

Animation loops

https://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm
https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

Canvas & Rendering

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect

Keyboard mapping

https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
https://www.w3schools.com/js/js_switch.asp

Generating random positions within the grid

https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527820#1527820

Game state management & pausing

https://forum.kirupa.com/t/pausing-requestanimationframe/633995
https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame

Font used: [https://fonts.google.com/knowledge/glossary/monospace_axis](https://fonts.google.com/specimen/VT323)

The design was based off of this Snake Game from Nintendo: https://www.nintendo.com/en-ca/store/products/snake-game-switch/

## Technologies Used:
JavaScript, HTML, CSS.

## Future Enhancements:
- Adding additional challenges
- Adding difficulty levels, increasing the frame rate with each fruit eaten
- Storing the high scores in a local storage so that it persists through refreshes
- Adding responsive design to different screen sizes
- Adding arrow buttons so that the game can be played on mobile
