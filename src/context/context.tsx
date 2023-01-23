import React, { useReducer, useContext, createContext } from "react";

interface stateType {
  token: string;
}

interface actionType {
  payload: stateType;
  type: "LOGIN" | "LOGOUT";
}

const initialState: stateType = {
  token: window.localStorage.getItem("token") ?? "",
};
interface Props {
  children: JSX.Element;
}

const AppContext = createContext<{
  state: stateType;
  dispatch: React.Dispatch<actionType>;
}>({ state: initialState, dispatch: () => undefined });

const reducer = (state: stateType, action: actionType): stateType => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };

    case "LOGOUT":
      window.localStorage.removeItem("token");
      return {
        ...state,
        token: "",
      };

    default:
      throw new Error();
  }
};

const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext: any = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
