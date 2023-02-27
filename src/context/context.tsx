import React, { useReducer, useContext, createContext } from "react";

interface stateType {
  token: string;
  firstName: string;
}

interface actionType {
  payload: stateType;
  type: "LOGIN" | "LOGOUT" | "AVATAR";
}

const initialState: stateType = {
  token: window.localStorage.getItem("token") ?? "",
  firstName: window.localStorage.getItem("firstName") ?? "",
};
interface Props {
  children: JSX.Element;
}

const AppContext = createContext<{
  stateContext: stateType;
  dispatch: React.Dispatch<actionType>;
}>({ stateContext: initialState, dispatch: () => undefined });

const reducer = (stateContext: stateType, action: actionType): stateType => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("token", action.payload.token);
      return {
        ...stateContext,
        token: action.payload.token,
      };

    case "LOGOUT":
      window.localStorage.removeItem("token");
      return {
        ...stateContext,
        token: "",
      };

    case "AVATAR":
      window.localStorage.setItem("firstName", action.payload.firstName);
      return {
        ...stateContext,
        firstName: action.payload.token,
      };

    default:
      throw new Error();
  }
};

const AppProvider: React.FC<Props> = ({ children }) => {
  const [stateContext, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ stateContext, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext: any = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
