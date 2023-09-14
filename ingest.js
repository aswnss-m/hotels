import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
async function ingestData() {
    const text_hotel_data = fs.readFileSync("src/data/details.txt", "utf-8");
    console.log(text_hotel_data);
    console.log(process.env.SUPABASE_URL);
    console.log(process.env.SUPABASE_PRIVATE_KEY);
    console.log(process.env.OPENAI_API_KEY);


    const client = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_PRIVATE_KEY,
    );

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 10,
    });

    const splitDocuments = await splitter.createDocuments([text_hotel_data]);

    const embeddings = new OpenAIEmbeddings({
        modelName: "text-embedding-ada-002",
        apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorstore = await SupabaseVectorStore.fromDocuments(
        splitDocuments,
        embeddings,
        {
            client,
            tableName: "documents",
            queryName: "match_documents",
        }
    );

    return { ok: true };
}

ingestData();
