import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'
import { toast } from 'react-toastify'; // Tambahan

const sdk = new W3SSdk()

sdk.setAppSettings({
  //appId: '<Your App Id>',
  appId: process.env.NEXT_PUBLIC_APP_ID,
})
sdk.setAuthentication({
  //userToken: '<Your user token>',
  //encryptionKey: '<Your encryption key>',
   userToken: process.env.NEXT_PUBLIC_USER_TOKEN,
   encryptionKey: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
})

sdk.execute(challengeId, (error, result) => {
  if (error) {
    // console.log(
    //   `${error?.code?.toString() || "Unknown code"}: ${
    //     error?.message ?? 'Error!'
    //   }`
    // )

    //Start Tambahan 1
    console.error("Full error object: ", error);
    console.log(`Error code: ${error?.code?.toString() || "Unknown code"}: ${error?.message ?? "Error!"}`);
    toast.error(`Error code: ${error?.code?.toString() || "Unknown code"}`);
    return;
    //End Tambahan 1

    return
  }

  console.log(`Challenge: ${result.type}`)
  console.log(`status: ${result.status}`)

  //Start Tambahan 
  console.log("App ID: ", process.env.NEXT_PUBLIC_APP_ID);
  console.log("User Token: ", process.env.NEXT_PUBLIC_USER_TOKEN);
  console.log("Encryption Key: ", process.env.NEXT_PUBLIC_ENCRYPTION_KEY);
  console.log("Challenge ID: ", process.env.NEXT_PUBLIC_CHALLANGE_ID);

  sdk.execute(challengeId, (error, result) => {
    if (error) {
      toast.error(`Error: ${error?.message ?? "Unknown error"}`);
      return;
    }
    toast.success(`Challenge Verified`);
  });

  //End Tambahan 

  if (result.data) {
    console.log(`signature: ${result.data?.signature}`)
  }
})