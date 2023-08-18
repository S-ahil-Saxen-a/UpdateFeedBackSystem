import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Some query is required!", { status: 400 });
    }

    const appendedQuery =
      "act as a prompt generator for image generation process that generates images from query, what I want from you is whenever i give you any user query generate a fashion generator outfit query so that i can generate a image from your query and whenever i want any upgradation, upgrade or overwrite that query with new one and again generate that new query. important, query should be as consise and clear as it generate image from open ai. ONLY GENERATE QUERY IN DOUBLE QUOTES, no explanation further. ";
    
    var finalMessage = appendedQuery + messages[0].content;
    // console.log("final msg" + finalMessage);
    // console.log("original" + JSON.stringify(messages));
    messages[0].content = finalMessage;
    console.log("FinalMess" + JSON.stringify(messages));

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });



    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
