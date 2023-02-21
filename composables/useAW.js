import { Client, Account, Databases } from 'appwrite'

const client = new Client()
client
  .setEndpoint(process.env.AW_ENDPOINT) // Your Appwrite Endpoint
  .setProject(process.env.AW_PROJECT_ID)

export const auth = new Account(client)
export const db = new Databases(client, process.env.AW_TOOL_DB_ID)
