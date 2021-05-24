let ca;
let state = Array(41);
let rule_code = 120;
let ca_code_input;

let res;
let listDraw;
let count = 0;
let draw_row;

let sliderFrameRate;

function setup() {
  createCanvas(windowWidth*0.95, windowHeight*0.8);
  background(255);
  ca_code_input = createInput('120');
  

  for (let i = 0; i < state.length; i++){
    state[i] = i !== Math.ceil(21/2) ? 0 : 1;
  }
  ca = new CA1D(state, rule_code);
  ca_code_input.changed(convertStr2Int);


  sliderFrameRate = createSlider(1, 24, 10);
  sliderFrameRate.changed(changeFrameRate)

  describeP1 = createP("Rule");
  describeP2 = createP("Frame Rate");
  describeP3 = createP(sliderFrameRate.value())
  res = (windowWidth*0.95)/state.length;
  listDraw = Array( int(Math.floor(height/res))-1 );
  for (let i =0; i < listDraw.length; i++){ 
    listDraw[i] = Array(state.length).fill(0);
  }

  draw_row = listDraw.length;



  describeP1.position(10, windowHeight*0.8);
  ca_code_input.position(50, windowHeight*0.82); ca_code_input.size(60);

  describeP2.position(10, windowHeight*0.84);
  describeP3.position(250, windowHeight*0.84);
  sliderFrameRate.position(100, windowHeight*0.86);

  frameRate(10);
  
}

// JSON.parse(JSON.stringify(this.current_state))

function draw() {
  let sum = ca.current_state.reduce( (acc, value) => acc + value);
  if (sum === 0) { 
      state[Math.ceil(21/2)] = 1;
      ca.current_state = state; 
    }

  ca.next_generation();

  listDraw[count] =  JSON.parse(JSON.stringify(ca.current_state)); count += 1;

  

  for (let i = 0; i < listDraw.length; i++){
    for (let j = 1; j < state.length-1; j++){
      let bw = (listDraw[i][j] === 1) ? 0:255;  
      fill(bw);
      // noStroke();
      rect(j*res+width*0.015, i*res+height*0.015, res, res);
    }
  }
  if ( count === draw_row ){ listDraw.shift();  count = draw_row-1; }
}




function convertStr2Int() {
  let value = parseInt(this.value());
  ca.rule_set = ca.fillZero(value);
}


function changeFrameRate(){
  frameRate(this.value());
  describeP3.html(this.value());
}