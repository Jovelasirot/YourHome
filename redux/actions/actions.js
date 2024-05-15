import { useNavigate } from "react-router-dom";

export const TURN_OFF_SPINNER = "TURN_OFF_SPINNER";
export const TURN_ON_SPINNER = "TURN_ON_SPINNER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const GET_PROPERTIES = "GET_PROPERTIES";
export const GET_PROFILE = "GET_PROFILE";
export const FAVORITES_LIST = "ADD_TO_FAVORITE";
export const GET_ALL_PROPERTIES = "GET_ALL_PROPERTIES";
export const GET_SINGLE_PROPERTY = "GET_SINGLE_PROPERTY";

const baseEndPoint = "http://localhost:3001";

export const registerUser = (payload, navigate) => {
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
        navigate("/login");
      } else {
        alert("Error while registering, try another email.");
        window.location.reload();
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
        localStorage.setItem("token", data.token);
        dispatch({ type: LOGIN_USER, payload: data });
        dispatch(getProfile(data.token));
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

export const postImage = (token, image) => {
  const formData = new FormData();
  formData.append("image", image);
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndPoint + "/users/me/avatar/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("image", data);
      } else {
        alert("Error while posting the image");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};

export const getProperties = (token, filters) => {
  return async (dispatch) => {
    dispatch({ type: TURN_ON_SPINNER });
    try {
      const safeFilters = { ...filters };
      if (
        safeFilters.propertyStatus === "ALL" ||
        safeFilters.propertyStatus === null
      ) {
        delete safeFilters.propertyStatus;
      }
      if (
        safeFilters.propertyType === "ALL" ||
        safeFilters.propertyType === null
      ) {
        delete safeFilters.propertyType;
      }
      const queryParams = new URLSearchParams(safeFilters).toString();
      const response = await fetch(
        baseEndPoint + "/properties" + "/search" + "?" + queryParams,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_PROPERTIES, payload: data });
      } else {
        alert(
          "Error while fetching the properties, select all the input for the filters."
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};

export const getAllProperties = (token) => {
  return async (dispatch) => {
    dispatch({ type: TURN_ON_SPINNER });
    try {
      const response = await fetch(baseEndPoint + "/properties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_ALL_PROPERTIES, payload: data });
      } else {
        alert("Error while fetching the properties");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};

export const getSingleProperty = (token, propertyId) => {
  return async (dispatch) => {
    dispatch({ type: TURN_ON_SPINNER });
    try {
      const response = await fetch(baseEndPoint + "/properties/" + propertyId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_SINGLE_PROPERTY, payload: data });
      } else {
        alert("Error while fetching the property");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};

export const getProfile = (token) => {
  return async (dispatch) => {
    dispatch({ type: TURN_ON_SPINNER });
    try {
      const response = await fetch(baseEndPoint + "/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_PROFILE, payload: data });
      } else {
        alert("Error while fetching profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};

export const getFavoriteList = (token) => {
  return async (dispatch) => {
    dispatch({ type: TURN_ON_SPINNER });
    try {
      const response = await fetch(baseEndPoint + "/users/me/favorites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: FAVORITES_LIST, payload: data });
      } else {
        alert("Error while fetching profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};

export const updateFavoritesList = (token, propertyId) => {
  return async (dispatch) => {
    dispatch({ type: TURN_ON_SPINNER });
    try {
      const response = await fetch(
        baseEndPoint + "/users/me/favorites/properties/" + propertyId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Property favorite list updated");
        dispatch(getFavoriteList(token));
      } else {
        alert("Error while updating favorites");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};
