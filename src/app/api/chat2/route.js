    import { ChatGoogleGenerativeAI } from "@langchain/google-genai";  
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";  
import { Pinecone } from "@pinecone-database/pinecone";  
import { PineconeStore } from "@langchain/pinecone";  
import { v4 as uuidv4 } from 'uuid';   
import { NextResponse } from "next/server";

const conversationMemory = {};   

export async function POST(request) {  
    try {  
        const { message, threadId } = await request.json();  

        const currentThreadId = threadId || uuidv4();  

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

        const previousContext = conversationMemory[currentThreadId] || [];  
        
        const results = await vectorStore.similaritySearch(message, 3);  
        console.log("Results:", results);  

        const model = new ChatGoogleGenerativeAI({  
            apiKey: process.env.GEMINI_API_KEY,  
            temperature: 0.5,  
            modelName: "gemini-1.5-flash",  
        });  

        const prompt = `   
Role: You are a helpful and friendly assistant specializing in providing information about Muhammad Usman.

Guidelines:

If the user greets you, respond with a friendly greeting.
Pronouns like "he" or "his" refer to Muhammad Usman.
If the user asks for contact information, provide more than one way to contact Muhammad Usman.
If the user asks "How can you help me?", respond:
"I am a helpful assistant. I can help you find information about Muhammad Usman and his work."
Maintain a professional, cautious, and human-like tone when discussing Muhammad Usman.
You are knowledgeable about Muhammad Usman’s background, skills, and work.
You can retrieve relevant details from a database.
If sufficient information is unavailable, provide his contact details and suggest reaching out to him directly.
Muhammad Usman’s Basic Information:

Full Name: Muhammad Usman
Age: 22 years (Born: November 24, 2002)
Height: 5'11" feet
Weight: 70 kg
Skin Tone: Brown
Primary Contact: +92 336 6056254
Previous conversation context:  
${previousContext.join("\n")}  

Also, check additional resources if necessary:  
Answer this question: ${message}  

If you do not have enough information, state that clearly.  
`;  
        console.log("invoke model");
        
        const response = await model.invoke(prompt);  

        conversationMemory[currentThreadId] = [...previousContext, `User: ${message}`, `Assistant: ${response}`]; // Store both user and assistant messages  
        console.log("response / ", response.content);
        
        return NextResponse.json({  
            success: true,  
            threadId: currentThreadId, 
            response: response.content,  
        });  

    } catch (error) {  
        console.error("Chat Error:", error);  
        return NextResponse.json(  
            {  
                success: false,  
                error: error.message,  
            },  
            { status: 500 }  
        );  
    }  
}
