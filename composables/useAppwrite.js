import {Client, Account, Storage, ID} from 'appwrite';

export const useClient = () => {
  return useState('client', () => undefined);
};

export const useAppwrite = () => {
  const config = useRuntimeConfig();
  const client = ref(
    new Client()
      .setEndpoint(config.public.APPWRITE_ENDPOINT)
      .setProject(config.public.APPWRITE_PROJECT_ID),
  );

  const account = new Account(client.value);
  const storage = new Storage(client.value);
  return {account, storage, ID};
};
