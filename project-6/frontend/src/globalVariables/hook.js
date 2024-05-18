import { useContext } from "react";
import Context from "./Context";

function useVariable() {
  return useContext(Context);
}

export default useVariable;
