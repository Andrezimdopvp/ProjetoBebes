img = "";
status = "";
objects = [];
som = "";

function preload(){
    som = loadSound("alarm.mp3")
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function modelLoaded(){
    console.log("Modelo Carregado!")
    status = true;
    objectDetector.detect(video, gotResult);
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detectando Objetos";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
      for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status: Objeto Detectado";
        document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados: "+ objects.length;

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke("#FF0000");
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == "person")
          {
            document.getElementById("numberOfObjects").innerHTML = "Bebê encontrado";
            console.log("stop");
            som.play();}
            
      }  

      
    } 

}

function gotResult(error, results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}