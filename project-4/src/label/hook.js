import { useContext } from "react";
import Context from "./Context";

function useLabel() {
  return useContext(Context);
}

export default useLabel;
