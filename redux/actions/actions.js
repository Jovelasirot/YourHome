export const TURN_OFF_SPINNER = "TURN_OFF_SPINNER";
export const TURN_ON_SPINNER = "TURN_ON_SPINNER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";

const baseEndPoint = "http://localhost:3001";

export const registerUser = (payload) => {
  return async (dispatch) => {
    dispatch({ type: TURN_ON_SPINNER });
    try {
      dispatch({ type: TURN_ON_SPINNER });
      const response = await fetch(baseEndPoint + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: REGISTER_USER, payload: data });
      } else {
        alert("Error while registering");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};

export const loginUser = (payload) => {
  return async (dispatch) => {
    dispatch({ type: TURN_ON_SPINNER });
    try {
      dispatch({ type: TURN_ON_SPINNER });
      const response = await fetch(baseEndPoint + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: LOGIN_USER, payload: data });
      } else {
        alert("Error while login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};