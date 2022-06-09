import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

import {
  setToken,
  setDisplayName,
  setProfileObject,
} from "../redux/accountManager";

import http from "../services/serviceVariables";

const useAccount = () => {
  const dispatch = useDispatch();
  const { token, profileObject } = useSelector((state) => state.accountManager);

  const [requestLoading, setRequestLoading] = useState(true);
  const [downtime, setDowntime] = useState(false);
  const [register, setRegister] = useState(false);

  const [message, setMessage] = useState("");

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    async function userExists() {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
      });

      dispatch(setDisplayName(user.name));

      await http
        .get(`/profiles/uid/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          let displayNameFromResponse = response.data.displayName;

          if (
            displayNameFromResponse !== "" &&
            displayNameFromResponse !== null
          ) {
            dispatch(setDisplayName(response.data.displayName));
          }

          dispatch(setProfileObject(response.data));

          setRequestLoading(false);
        })
        .catch((e) => {
          console.log(e);
          if (e.response) {
            if (e.response.status === 404) {
                console.log("register gaat naar TRUE!")
              setRegister(true);
              setRequestLoading(false);
            } else {
              setRequestLoading(false);
            }
          } else {
            setDowntime(true);
            setRequestLoading(false);
          }
        });

      await dispatch(setToken(accessToken));
    }

    if ((token === null || profileObject === null) && isAuthenticated) {
      console.log("Ik ga dingen doen");
      userExists();
    } else {
      console.log("Ik skip lekker een heel stuk want waarom niet hè");
      setRequestLoading(false);
    }
  }, [user]);

  return { token, downtime, register, message, requestLoading };
};

export default useAccount;
