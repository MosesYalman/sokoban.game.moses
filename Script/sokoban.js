console.log("Start");
//const doc=document.body;
const avatar=document.getElementsByClassName("entity-player")[0];    
var x=11;
var y=11;
console.log("Start 1");
console.log(tileMap01.mapGrid[x][y])

document.addEventListener('keydown',keyPressed);

function keyPressed(event){
    console.log("keypressed");
    var dirX=0;
    var dirY=0;
    switch (event.keyCode) {
        case 39:{ //Right
            dirX=1;
            break;
        }
        case 37:{ //Left
            dirX=-1;
            break;
        }   
        case 38:{ //Up
            dirY=-1;
            break;
        }
        case 40:{//Down
            dirY=1;
            break;
        }
        default:{
            break;
        }
        
        }
        console.log( event.keyCode+"was pressed");
        console.log("x: "+x+" y: "+y+"  newX: "+dirX+" newY: " + dirY);
        if (checkFreeTile(x,y,dirX,dirY)){
            moveObject(avatar,x,y,dirX,dirY);
            x+=dirX;
            y+=dirY;
        }        
    }

    
    function moveObject(element,currPosX,currPosY,dirX,dirY){
    //document.getElementsByClassName("entity-player").style.top=toString(newX*25)+"px";    
    element.style.position="absolute";
    element.style.left=(currPosX+dirX)*25+"px";
    element.style.top=(currPosY+dirY)*25+"px";
    //avatar.left=(newX*25)+"px";
    //avatar.style.top=
    console.log(((currPosX+dirX)*25)+"px");
    console.log(((currPosY+dirY)*25)+"px");
    console.log("x: "+x+" y: "+y+"  newX: "+(currPosX+dirX)+" newY: " + (currPosY+dirY));
    console.log("left: "+element.style.left+" top: "+element.style.top);  
    var toMove=tileMap01.mapGrid[currPosX][currPosY];
    tileMap01.mapGrid[currPosX][currPosY]=" ";
    tileMap01.mapGrid[(currPosX+dirX)][(currPosY+dirY)]=toMove;

    }

    function checkFreeTile(currPosX,currPosY,dirX,dirY){
            var checkX=currPosX+dirX;
            var checkY=currPosY+dirY;
            console.log("x: "+currPosX+" y: "+currPosY);
            console.log("x: "+dirX+" y: "+dirY);
            console.log(tileMap01.mapGrid[x][y])
            console.log("x: "+checkX+" y: "+checkY +" tile: "+tileMap01.mapGrid[checkX][checkY] + 
            "\ntileMap width: "+tileMap01.width+" tileMap Hight: "+tileMap01.height);

            // Are we moving out from grid stay inside
            if ((checkX<0) || (checkY<0) || (checkX>=(tileMap01.width)) || (checkY>=(tileMap01.height)))
            { 
                console.log(" CFT1 x: "+checkX+" y: "+checkY+"  newX: "+tileMap01.width+" newY: " + tileMap01.height);
                return false;
           }
           return true;
           console.log(" CFT2 x: "+checkX+" y: "+checkY+"  Tile: " );
           //Check for free tile or Blockstorage 
           if ((tileMap01.mapGrid[checkX][checkY]===" ") || (tileMap01.mapGrid[checkX][checkY]==="G")) { //Is tile empty move.
            console.log(" CFT 3 Time to move");   
            return true;
           }
              else 
              {
                  //Check for block
                console.log("CFT 4 Check for 'b'");    
                if(tileMap01.mapGrid[checkX][checkY]==="B"){
                      if(checkFreeTile(checkX,checkY,dirX,dirY)){
                          moveObject(document.getElementsByClassName("entity-block"),checkX,checkY,dirX,dirY);
                          return true;  
                        }
                  }                                
               }   
           return false;    
            }    