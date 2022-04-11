"use strict";
const mapGrid=document.getElementsByClassName("mapGrid")[0];
const scale=25;
var avatarX;
var avatarY;


const boxes =[];


displayGridMap();

document.addEventListener('keydown',keyPressed);

function keyPressed(event){
    console.log("key pressed");
    event.preventDefault();
    var dirX=0;
    var dirY=0;
    switch (event.keyCode) {
        case 39:{ 
            dirX=1;
            console.log("right");
            break;
        }
        case 37:{ 
            dirX=-1;
            console.log("left");
            break;
        }   
        case 38:{ 
            dirY=-1;
            console.log("up");
            break;
        }
        case 40:{ 
            dirY=1;
            console.log("down");
            break;
        }
        default:{
            break;
        }
        
    }
        console.log(avatarX,avatarY,dirX,dirY);
           
        checkFreeTile(avatarX,avatarY,dirX,dirY);
        }        
    

    
    function moveObject(className,from,to){
    console.log("Class: "+ className+" From: "+ from+" To: "+ to)    
    from.classList.toggle(className);  
    to.classList.toggle(className);    

    }

    function checkFreeTile(currPosX,currPosY,dirX,dirY){
            console.log("checkFreeTile");
            var entity;
            var checkX=currPosX+dirX;
            var checkY=currPosY+dirY;
            console.log("x: " +currPosX,currPosY);
            if ((checkX<0) || (checkY<0) || (checkX>=tileMap01.width) || (checkY>=tileMap01.height))
            { 
                return;
            }
            
            const toMoveFromId=document.getElementById("x"+currPosX+"y"+currPosY);
            const toMoveToId=document.getElementById("x"+checkX+"y"+checkY);
            console.log(toMoveFromId.classList);
            
            console.log(toMoveToId.classList);

            if(toMoveToId.classList.contains(Entities.Block) && toMoveFromId.classList.contains(Entities.Character)){
                console.log("to: "+toMoveToId.classList+" from: " + toMoveFromId.classList);
               checkFreeTile(checkX,checkY,dirX,dirY);
              }
                          
            if (!toMoveToId.classList.contains(Entities.Block)&&(toMoveToId.classList.contains(Tiles.Space) || toMoveToId.classList.contains(Tiles.Goal))){
                console.log("move something");
                if(toMoveFromId.classList.contains(Entities.Character)){
                    entity=Entities.Character;
                    avatarX=checkX;
                    avatarY=checkY;
                }
                else
                {
                    console.log("move Block")
                    entity=Entities.Block;          
                }
                console.log("Now we move")       
                moveObject(entity,toMoveFromId, toMoveToId);
            }
         
                   return               
             }
        
            
            function displayGridMap(){
                console.log("display grid")
                mapGrid.style.width=scale*tileMap01.width+"px";
                mapGrid.style.height=scale*tileMap01.height+"px";     
                for (var tileY=0;tileY<tileMap01.height;tileY++){
                    for (var tileX=0;tileX<tileMap01.width;tileX++){
                        var cssTileType="";
                        switch(tileMap01.mapGrid[tileY][tileX][0]){
                            case "B":{
                            cssTileType=Entities.Block+" "+Tiles.Space;
                            break;        
                            }
                            case "W":{
                            cssTileType=Tiles.Wall;
                            break;        
                            }
                            case "P":{
                            cssTileType=Tiles.Space+" "+Entities.Character;
                                avatarX=tileX;
                                avatarY=tileY;
                                break;
                            }
                            case "G":{
                                cssTileType=Tiles.Goal;
                                break;
                            }
                            default:
                                cssTileType=Tiles.Space;
                                break;
                        }
                        makeTile("tile "+cssTileType,tileX,tileY);
                                      
                    }

                }
                console.log("Display Grid Done");
            }

            function makeTile(cssTileType,x,y){
                let tile=document.createElement('div');
                let idValue="x"+x+"y"+y;
                tile.id=idValue;
                tile.className=cssTileType;
                mapGrid.appendChild(tile);            
            }