

const initialState = { babyIsSleeping : true}

function storeValue(state = initialState, action){
  let nextState
  switch (action.type) {
    case 'STORE_VALUE':
      nextState = { babyIsSleeping: action.value  };
      return nextState  || state
  default:
    return state

  }
}

export default storeValue
