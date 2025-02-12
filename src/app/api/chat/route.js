// app/api/chat/route.js
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

export async function POST(request) {
    try {
        const { message } = await request.json();

        if (!message) {
            return Response.json(
                { success: false, error: "Message is required" },
                { status: 400 }
            );
        }

        const pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });
        const indexName = process.env.PINECONE_INDEX;
        const pineconeIndex = pinecone.Index(indexName);

        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            modelName: "embedding-001",
        });

        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex,
            textKey: "text",
            namespace: "portfolio-data",
        });

        const results = await vectorStore.similaritySearch(message, 3);
        console.log("Results:", results);


        const model = new ChatGoogleGenerativeAI({
            apiKey: process.env.GEMINI_API_KEY,
            temperature: 0.3,
            modelName: "gemini-pro",
        });



const prompt = ` 
Be a help full and friendly assistant.
if the user ask for contact information, provide more than one way to contact Mubeen Amjad.
if the user ask how can you help me? answer this way: i am a help full assistant. I can help you in finding information about Mubeen Amjad and his work.
you are a help full assistant.You can help in finding information about Mubeen Amjad and his work.
you will answer the quries about Mubeen Amjad very humanly, professionally and cautiously.
You are a knowledgeable assistant about Mubeen Amjad and his work.  
You can retrieve relevant information from a database and scrape data as needed. 
If you do not have enough information then provide contact info and suggest to contact Mubeen Amjad directly.

Please respond to the following message in a concise and professional manner:  

Based on the following context:  
${results.map(r => r.pageContent).join("\n")}  
Mubeen learn web development and coding from PIAIC (Presidential Initiative for Artificial Intelligence and Computing (Pakistan)) by Sir Zia Khan, Naveed Sarwar and Abu Hurairah and from Gamica Cloud (GAMICA Initiative
for Artificial Intelligence & Computing (GIAIC) by Sir Khurram Raheel .

Also, check additional resources if necessary:  
Answer this question: ${message}  

If you do not have enough information , state that clearly.  
`
        const response = await model.invoke(prompt);

        return Response.json({
            success: true,
            response: response,
        });

    } catch (error) {
        console.error("Chat Error:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}