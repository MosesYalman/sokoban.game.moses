"use strict";
//const doc=document.body;  
const mapGrid=document.getElementsByClassName("mapGrid")[0];
const scale=25;
var avatarX;
var avatarY;


const boxes =[];


displayGridMap();

document.addEventListener('keyup',keyPressed);

function keyPressed(event){
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
        console.log(avatarX,avatarY,dirX,dirY);
           
        checkFreeTile(avatarX,avatarY,dirX,dirY);
        }        
    

    
    function moveObject(element,from,to){
    //document.getElementsByClassName("entity-player").style.top=toString(newX*25)+"px"; 
    from.classList.toggle(element);    
    to.classList.toggle(element);    

    }

    function checkFreeTile(currPosX,currPosY,dirX,dirY){
            var checkX=currPosX+dirX;
            var checkY=currPosY+dirY;
            console.log("x: " +currPosX,currPosY);
            if ((checkX<0) || (checkY<0) || (checkX>=tileMap01.width) || (checkY>=tileMap01.height))
            { 
                return;
            }
  
           const toMoveFromId=document.getElementById("x"+currPosX+"y"+currPosY);
           const toMoveToId=document.getElementById("x"+checkX+"y"+checkY);
           console.log(toMoveFromId.className);

           console.log(toMoveToId.className);
           if (toMoveToId.class===Tiles.Space || toMoveToId.class===Tiles.Goal){
                toMoveFromId.classList.toggle(toMoveFrom.includes(Entity-Player)?Entity.Character:Tiles.Block);    
                toMoveToID.classList.toggle(toMoveFrom.includes(Entity-Player)?Entity.Character:Tiles.Block);    
        
                if(toMoveFromId.class=Entities.Character){
                avatarX=checkX;
                avatarY=checkY;
                }
            }
              else 
                    {
                      if(toMoveToId.class===Tiles.Block && toMoveFromId!=Tiles.Block){
                         checkFreeTile(checkX,checkY,dirX,dirY)           
                        }
                   }                                
             }
        
            
            function displayGridMap(){
                mapGrid.style.width=scale*tileMap01.width+"px";
                mapGrid.style.height=scale*tileMap01.height+"px";     
                for (var tileY=0;tileY<tileMap01.height;tileY++){
                    for (var tileX=0;tileX<tileMap01.width;tileX++){
                        var cssTileType="";
                        switch(tileMap01.mapGrid[tileY][tileX][0]){
                            case "B":{
                            boxes.push({tileX,tileY});
                            cssTileType=Entities.Block;
                            break;        
                            }
                            case "W":{
                            cssTileType=Tiles.Wall;
                            break;        
                            }
                            case "P":{
                            cssTileType=Entities.Character;
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
                        makeBlock("block "+cssTileType,tileX,tileY);
                                      
                    }

                }

            }

            function makeBlock(cssTileType,x,y){
                let tile=document.createElement('div');
                let idValue="x"+x+"y"+y;
                tile.id=idValue;
                tile.className=cssTileType;
                mapGrid.appendChild(tile);            
            }