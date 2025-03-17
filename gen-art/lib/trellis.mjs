let is_delete = false;
let current_row = {
  name: '',
  content: null
};
let callbacks = {
  'all': (key, key_event) => {console.log(`KEY ${key} WAS ${key_event}`);}
};

//TODO: Maybe in the furute we should init this with the size
let trellis = {
  a: Array(8).fill(false),
  b: Array(8).fill(false),
  c: Array(8).fill(false),
  d: Array(8).fill(false),
  e: Array(8).fill(false),
  f: Array(8).fill(false),
  g: Array(8).fill(false),
  f: Array(8).fill(false)
}


let process_char = (character) => {
  if(character === 'x') {
    is_delete = true;
  } else {
    let key_event = is_delete ? 'UP' : 'DOWN';
    if( ['a', 'b', 'c', 'd', 'e', 'f', 'g'].includes(character) ) {
      current_row.name = character;
      current_row.content = trellis[character];
      process_callbacks(character, key_event);
    } else {
      if( ['1', '2', '3', '4', '5', '6', '7', '8'].includes(character) ) {
        process_callbacks(character, key_event);
        if(current_row.content){
          let key = `${current_row.name}${character}`;
          current_row.content[parseInt(character)] = !is_delete;
          current_row.content = null;
          current_row.name = '';
          is_delete = false;
          process_callbacks(key, key_event);
        }
      } else {
        console.log('IGNORED', character);
      }
    }
  }
}

let process_callbacks = (key, key_event) => {
  if (key in callbacks) {
    callbacks[key](key, key_event);
  }
  callbacks.all(key, key_event);
}

let on_press = (row, column, callback) => {
    
}

export {process_char, on_press};
