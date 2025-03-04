import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { readTextFile } from "@/utils/fileLoader";
import path from "path";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const indexName = process.env.PINECONE_INDEX; 
    const pineconeIndex = pinecone.Index(indexName);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "embedding-001",
    });

    const [ textData] = await Promise.all([
      readTextFile(path.join(process.cwd(), "public/data/about-me.txt")),
    ]);

    const combinedData = `
      // GITHUB_REPOS: ${JSON.stringify(githubData)}
      PORTFOLIO_TEXT: ${textData}
    `;

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.createDocuments([combinedData]);

    const vectorStore = await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex,
      textKey: "text",
      namespace: "portfolio-data",
    });

    return NextResponse.json({
      success: true,
      message: "Data stored successfully in Pinecone",
    });
  } catch (error) {
    console.error("Pinecone Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
