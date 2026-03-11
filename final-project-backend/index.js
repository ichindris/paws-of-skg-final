import { MongoClient } from 'mongodb';

const url  ="mongodb+srv://ichindris_db_user:<xGB1X6oGyAItguHk>@paws-db.f685i49.mongodb.net/?appName=paws-db"

const client = new MongoClient(url);

const dbName = "paws-db";

async function main(){
  try{
    await client.connect();

    console.log('Connecetd to MongoDB Atlas');
  } catch (error) {
    console.error(error);
  }
}

main();