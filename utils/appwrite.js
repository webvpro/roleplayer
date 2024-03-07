import {Client, Account, Storage, Functions} from 'appwrite';
const config = useRuntimeConfig();
export const client = new Client();
client
  .setEndpoint(config.public.APPWRITE_ENDPOINT)
  .setProject(config.public.APPWRITE_PROJECT_ID);

export const account = new Account(client.value);
export const storage = new Storage(client.value);
export const functions = new Functions(client.value);
export {ID} from 'appwrite';
