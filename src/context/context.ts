import { createContext, useReducer, useContext, useEffect } from "react";

interface stateType {
  authorized: boolean;
}
interface actionType {
  type: "LOGIN" | "init_stored" | "LOGOUT";
  payload: {
    authorized: boolean;
  };
}
interface Props {
  children: JSX.Element;
}

let initialState: stateType = { authorized: false };

const reducer = (state: stateType, action: actionType): stateType => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authorized: action.payload.authorized,
      };

    case "init_stored":
      console.log(action.payload.authorized);

      return {
        ...state,
        authorized: action.payload.authorized,
      };

    case "LOGOUT":
      return {
        ...state,
        authorized: false,
      };

    default:
      return state;
  }
};

const AppContext = createContext<{
  state: stateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

// const AppProvider: React.FC<Props> = ({ children }): JSX.Element => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     if (JSON.parse(JSON.stringify(window.localStorage.getItem("global")))) {
//       dispatch({
//         type: "init_stored",
//         payload: JSON.parse(window.localStorage.getItem("global") || "{}"),
//       });
//     }
//   }, []);

//   // useEffect(() => {
//   //     window.localStorage.setItem('global',JSON.stringify(state))
//   // },[state])

//   return (
//     <AppContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

const useGlobalContext = () => {
  return useContext(AppContext);
};

// export { AppProvider, useGlobalContext };
