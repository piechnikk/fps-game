# fps-game
This is a simple 3D game demo built using JavaScript and Three.js with server site built using Kotlin, Spark and PostgreSQL. The project was created in secondary school.

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#live-demo">Live Demo</a></li>
    <li><a href="#setup">Setup</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#technologies">Technologies</a></li>
  </ul>
</details>

## Live Demo

Explore the [live demo](http://fps-game.piechnik.ct8.pl/) of the fps-game app.

## Setup

#### To get a production version of this project up and running on your local machine, follow these steps:

1. Download the latest JAR file of the application: 

    - Go to the [Releases](https://github.com/piechnikk/fps-game/releases) section of my GitHub repository.

    - Find the latest release version and click on it to open the release page.

    - Look for the downloadable JAR file attached to the release (usually named something like `fps-game-v0.1.0.jar`).

    - Download the JAR file by clicking on it.

2. Run the application:
   - Open a terminal or command prompt.

   - Navigate to the directory where you downloaded the JAR file.

   - Run the application using the following command:
     ```sh
     java -jar yourapp-v1.0.0.jar
     ```

#### To set up a development version of this project, follow these steps:

1. Clone the repository: 
    ```
    git clone https://github.com/piechnikk/fps-game.git
    ```
2. Navigate to the client directory: 
    ```
    cd fps-game/client
    ```
3. Install the client dependencies using npm:
    ```
    npm install
    ```
4. Run the Node.js application and build it using the following command:
    ```
    npm run go
    ```
5. Copy the contents of the `client/dist` directory and paste them into the `server/src/main/resources/public` directory

6. Open the server directory in Kotlin IDE (i.e. IntelliJ IDEA) and run `server/src/main/kotlin/app.kt`

## Usage

Open your preferred web browser and navigate to `http://localhost:12567` to access the running application. 

#### CONTROLS
- wasd - movement
- spacebar - laser


#### EDYTOR

You need to enter the "EDYTOR" to save the level on the server. You can save the test level by clicking "zapisz test level na serwerze" button.
![editor](https://github.com/piechnikk/fps-game/assets/51060535/c690b34e-a79d-4c5e-b47b-c9fec804dbf3)

#### GAME
![interface](https://github.com/piechnikk/fps-game/assets/51060535/121e0c00-7f13-4565-bd44-ae84b026699c)

## Technologies

#### CLIENT
<div>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"> 
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript">
    <img src="https://img.shields.io/badge/Three%20js-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js">
</div>

#### SERVER
<div>
    <img src="https://img.shields.io/badge/Kotlin-0095D5?&style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin"> 
    <img src="https://img.shields.io/badge/Apache_Spark-FFFFFF?style=for-the-badge&logo=apachespark&logoColor=#E35A16" alt="Apache Spark">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
</div>

---

**Note**: This project was created in secondary school and serves as an example of a Three.js game.
