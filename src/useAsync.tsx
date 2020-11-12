import { useReducer, useCallback } from "react";
import { reducer } from "./util";

function useAsync<T>() {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    status: "idle",
    error: null,
  });
  const run = useCallback(
    (promise: Promise<T>) => {
      dispatch({ type: "pending", data: null, error: null });
      promise.then(
        (data) => dispatch({ type: "resolved", data, error: null }),
        (error) => dispatch({ type: "rejected", error, data: null })
      );
    },
    [dispatch]
  );
  const selectData = useCallback(
    (data) => dispatch({ type: "resolved", data, error: null }),
    [dispatch]
  );
  const clearData = useCallback(
    () => dispatch({ type: "clear", data: null, error: null }),
    [dispatch]
  );
  return { state, run, selectData, clearData };
}

export default useAsync;
