/*
"use server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const initialize_user = async () => {
  const idempotencyKey = uuidv4(); // generates an idempotency key


  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/user/initialize",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  TEST_API_KEY:9fc97aa7e96a13fadb3a399127396cbb:506da73b4f2cc84fa568cdc08e3173c2`,
      //Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, //Tambahan
      "X-User-Token": `${process.env.NEXT_PUBLIC_USER_TOKEN}`,
    },
    data: { idempotencyKey: idempotencyKey, blockchains: ["MATIC-AMOY"] },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log("idempotency key: ", idempotencyKey);
      console.log("Response data:", response.data); //Tambahan
      return response.data.data.challengeId;
    })
    .catch(function (error) {
      console.error(error);
      console.error('AxiosError:', error); //Tambahan
      throw error; //Tambahan
    });
};
*/


"use server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export const initialize_user = async () => {

  const idempotencyKey = uuidv4(); // generates an idempotency key
  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/user/initialize",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${process.env.NEXT_PUBLIC_API_KEY}`,
      "X-User-Token": `${process.env.NEXT_PUBLIC_USER_TOKEN}`,
    },

    data: { idempotencyKey: idempotencyKey, blockchains: ["MATIC-AMOY"] },

  };
  return axios

     .request(options)
    .then(function (response) {
      //console.log("Response data: ", response.data);
      console.log("idempotency key: ", idempotencyKey);
      return response.data.data.challengeId;
      //return [response.data.data](http://response.data.data).challengeId;
    })

    //--Start Tambahan
    // .then(function (response) {
    //   const challengeId = response?.data?.data?.challengeId;
    //   const idempotencyKey = options.data.idempotencyKey; // Ambil idempotencyKey dari request data
      
    //   console.log("Challenge ID: ", challengeId);
    //   console.log("Idempotency Key: ", idempotencyKey); // Tampilkan idempotencyKey
    
    //   // Jika `idempotencyKey` yang dibutuhkan di UI, simpan dalam state atau variabel
    //   if (!idempotencyKey) {
    //     console.error("No idempotencyKey found");
    //     return;
    //   }
      
      // Lanjutkan proses sesuai yang dibutuhkan
      //return idempotencyKey; // Kembalikan idempotencyKey jika diperlukan
    //})
    //--END Tambahan
    

    .catch(function (error) {
      console.error(error);
    });
};
