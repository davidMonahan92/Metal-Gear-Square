const canvas = document.querySelector('canvas');
canvas.width = 300;
canvas.height = 300;

//Rendering context for the type of game - 2d game
const ctx = canvas.getContext('2d');

//Initial rectangle positioning
let player_x = 20;
let player_y = 20;
let count = 0;

//Creates the random x & y positions for the base to display, 
let base_x = Math.floor(Math.random()*250); //300-50=250 as its 50 in the strokeRect
let base_y = Math.floor(Math.random()*250); //300-50=250 as its 50 in the strokeRect

function incrementScore(){
	count+=1;
	document.getElementById('scoreCounter').innerHTML = count;
}

function step(){
	//clears everything from 0,0 to the whole width of the canvas, so rectangle doesn't leave a trail
	ctx.clearRect(0, 0, 300, 300);

	//Styles the rectangle to make it red
	ctx.fillStyle = 'red';

	//Paints the rectangle - position it starts & its measurements
	ctx.fillRect(player_x, player_y, 10, 10);

	//Creates the outline base that the rect will have to go into - position it starts & its measurements
	ctx.strokeRect(base_x,base_y,50,50);

	//Checks for collison detection, checks if the rectangle is in the square
	if(player_x >= base_x && player_y >= base_y & player_x <= base_x + 50 && player_y <= base_y +50){
		base_x = Math.floor(Math.random()*250); //Generates new base position
		base_y = Math.floor(Math.random()*250); //Generates new base position
		incrementScore();
	}


	//every 60th of a sec it will re-run the step method
	requestAnimationFrame(step);
}
//every 60th of a sec it will re-run the step method
requestAnimationFrame(step);

function handleInput(event) {
	const key = event.key; //stores the key pressed to key

	switch(key){
		case 'a':
			return player_x -= 5;
		case 'w':
			return player_y -= 5;
		case 'd':
			return player_x += 5;
		case 's':
			return player_y += 5;
	}

}

//Listening for a keypress by the user, when hears it, it calls the handleInput callback function
document.addEventListener('keypress', handleInput);