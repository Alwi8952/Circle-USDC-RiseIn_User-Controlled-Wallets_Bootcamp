//Start Base Code
/*
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";

let sdk;

//Start Tambahan 1
// useEffect(() => {
//   sdk = new W3SSdk();
//   console.log("SDK initialized:", sdk); // Tambahkan log ini
// }, []);
//End of Tambahan 1

function CreateWalletForm() {
  useEffect(() => {
    sdk = new W3SSdk();
  }, []);

  const [appId, setAppId] = useState(
    localStorage.getItem("appId") || "someAppId"
  );
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || "someUserToken"
  );
  const [encryptionKey, setEncryptionKey] = useState(
    localStorage.getItem("encryptionKey") || "someEncryptionKey"
  );
  const [challengeId, setChallengeId] = useState(
    localStorage.getItem("challengeId") || "someChallengeId"
  );

  const onChangeHandler = useCallback(
    (setState, key) => (e) => {
      const value = e.target.value;
      setState(value);
      localStorage.setItem(key, value);
    },
    []
  );

  const onSubmit = useCallback(() => {
    sdk.setAppSettings({ appId });
    sdk.setAuthentication({ userToken, encryptionKey });

    //Start Tambahan 2
    // console.log("App ID: ", appId);
    // console.log("User Token: ", userToken);
    // console.log("Encryption Key: ", encryptionKey);
    // console.log("Challenge ID: ", challengeId);
    //End of Tambahan 2

    sdk.execute(challengeId, (error, result) => {
      if (error) {
        //console.error("Error executing SDK: ", error); // Tambahan 3
        toast.error(`Error: ${error?.message ?? "Error!"}`);
        return;
      }

      //console.log("SDK result: ", result); // Log untuk result // Tambahan 4
      toast.success(`Challenge: ${result?.type}, Status: ${result?.status}`);
    });
  }, [appId, userToken, encryptionKey, challengeId]);

  return (
    <div className="p-4 bg-white mx-12 rounded">
      <div className="grid grid-cols-5">
        <div>
          <TextField
            label="App Id"
            onChange={onChangeHandler(setAppId, "appId")}
            value={appId}
          />
        </div>
        <div>
          <TextField
            label="User Token"
            onChange={onChangeHandler(setUserToken, "userToken")}
            value={userToken}
          />
        </div>
        <div>
          <TextField
            label="Encryption Key"
            onChange={onChangeHandler(setEncryptionKey, "encryptionKey")}
            value={encryptionKey}
          />
        </div>
        <div>
          <TextField
            label="Challenge Id"
            onChange={onChangeHandler(setChallengeId, "challengeId")}
            value={challengeId}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button variant="contained" color="success" onClick={onSubmit}>
            Verify Challenge
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateWalletForm;
*/
//END Base Code

//Start Modified Code
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";

let sdk;

function CreateWalletForm() {
  useEffect(() => {
    sdk = new W3SSdk();
  }, []);

  const [appId, setAppId] = useState(
    typeof window !== "undefined" && localStorage.getItem("appId") || "someAppId"
  );
  const [userToken, setUserToken] = useState(
    typeof window !== "undefined" && localStorage.getItem("userToken") || "someUserToken"
  );
  const [encryptionKey, setEncryptionKey] = useState(
    typeof window !== "undefined" && localStorage.getItem("encryptionKey") || "someEncryptionKey"
  );
  const [challengeId, setChallengeId] = useState(
    typeof window !== "undefined" && localStorage.getItem("challengeId") || "someChallengeId"
  );

  const onChangeHandler = useCallback(
    (setState, key) => (e) => {
      const value = e.target.value;
      setState(value);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
    },
    []
  );

  const onSubmit = useCallback(() => {
    sdk.setAppSettings({ appId });
    sdk.setAuthentication({ userToken, encryptionKey });

    sdk.execute(challengeId, (error, result) => {
      if (error) {
        toast.error(`Error: ${error?.message ?? "Error!"}`);
        return;
      }
      toast.success(`Challenge: ${result?.type}, Status: ${result?.status}`);
    });
  }, [appId, userToken, encryptionKey, challengeId]);

  const [isLoading, setIsLoading] = useState(false);

  //Start Tambahan
  const handleVerifyChallenge = () => {
    setIsLoading(true);
    sdk.execute(challengeId, (error, result) => {
      setIsLoading(false); // Hentikan loading setelah respons diterima
      if (error) {
        console.error("Full error object: ", error);
        toast.error(`Error: ${error?.message ?? "Unknown Error"}`);
        return;
      }
      console.log(`Challenge: ${result?.type}`);
      console.log(`Status: ${result?.status}`);
      if (result.data) {
        console.log(`Signature: ${result?.data?.signature}`);
      }
    });
  };
  //End Tambahan


  return (
    <div className="p-4 bg-white mx-12 rounded">
      <div className="grid grid-cols-5">
        <div>
          <TextField
            label="App Id"
            onChange={onChangeHandler(setAppId, "appId")}
            value={appId}
          />
        </div>
        <div>
          <TextField
            label="User Token"
            onChange={onChangeHandler(setUserToken, "userToken")}
            value={userToken}
          />
        </div>
        <div>
          <TextField
            label="Encryption Key"
            onChange={onChangeHandler(setEncryptionKey, "encryptionKey")}
            value={encryptionKey}
          />
        </div>
        <div>
          <TextField
            label="Challenge Id"
            onChange={onChangeHandler(setChallengeId, "challengeId")}
            value={challengeId}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button variant="contained" color="success" onClick={onSubmit}>
            Verify Challenge
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateWalletForm;

//End Modified Code