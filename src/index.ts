import "reflect-metadata";
import express, { Request, Response } from "express";
import db from "./db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schemaPromise from "./schema";
import cors from "cors";

const main = async () => {
  await db.initialize();
  console.log("DB init");

  const schema = await schemaPromise;
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
};

main().catch((error) => {
  console.error("Error:", error);
});
