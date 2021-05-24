class CA1D {
  constructor(state, rule_code){
    this.rule_set = this.fillZero(rule_code);
    this.current_state = state;
    this.previous_state = state;
  }

  fillZero(number){
    let str = number.toString("2")
    if (str.length < 8) {
      let lack = 8 - str.length;
      for (let i = 0; i < lack; i++) {
        str = "0" + str;
      }
    }
    return str.split("").reverse().join("");
  }

  rule(left, middle, right){
    let new_state;
    let index = parseInt( ("" + left + middle + right), 2);
    new_state = this.rule_set[index];
    return new_state;
  }


  copy_state(){
    this.previous_state = JSON.parse(JSON.stringify(this.current_state)); //Number(this.current_state[i]);
    return
  }

  next_generation(){

    let left, middle, right;
    let length = this.current_state.length;
    this.copy_state();

    for (let i = 1; i < length-1; i++){
      let left   = this.previous_state[i-1];
      let middle = this.previous_state[i+0];
      let right  = this.previous_state[i+1];
      this.current_state[i] = parseInt(this.rule(left, middle, right));
    }
  }
}