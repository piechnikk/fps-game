import com.google.gson.Gson
import spark.*
import spark.Spark.*
import spark.kotlin.port
import java.sql.DriverManager

data class LevelItem(
    var id:Int,
    var x:Int,
    var y:Int,
    var z:Int,
    var type:String
)
data class Level (
    var size:Int,
    var list:List<LevelItem>?
)
var actualLevel:Level = Level(0,null)
fun main() {
    port(12567)
    staticFileLocation("/public")
    get("/") {req, res -> index(req, res)} // get pliku index.html
    get("/game") {req, res -> game(req, res)} // get pliku game.html
    get("/editor") {req, res -> editor(req, res)} // get pliku editor.html
    post("/add") {req, res -> addLevel(req, res)} // dodanie danych levelu
    post("/load") {req, res -> loadLevel(req, res)} // pobranie danych levelu
    post("/save") {req, res -> save(req, res)} // pobranie danych levelu
    println("SparkServer startuje na porcie:12567")
}
fun index(req:Request, res:Response){
    res.type("text/html")
    res.redirect("index.html")
}
fun game(req:Request, res:Response){
    res.type("text/html")
    res.redirect("game.html")
}
fun editor(req:Request, res:Response){
    res.type("text/html")
    res.redirect("editor.html")
}
fun addLevel(req:Request, res:Response):String? {
    try {
        val post = Gson().fromJson(req.body(), Array<LevelItem>::class.java).toList()
        actualLevel = Level(post.size, post)
        return Gson().toJson("level added")
    } catch (e: Exception) {
        println(e.message)
        return (e.message)
    }
}
fun loadLevel(req:Request, res:Response):String? {
    try {
        return Gson().toJson(actualLevel)
    } catch (e: Exception) {
        println(e.message)
        return (e.message)
    }
}
fun save(req:Request, res:Response) {
    try {
        val post = req.body().toInt()

        val conn = DriverManager.getConnection("jdbc:postgresql://localhost/fps", "postgres", "admin")
        val stmt = conn.createStatement()


        stmt.execute("INSERT INTO wyniki (wynik) VALUES(${post});")
        conn.close()

    } catch (e: Exception) {
        println(e.message)
    }
}