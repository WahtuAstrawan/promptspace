import { dbConnect } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (req, { params }) => {
    try {
        await dbConnect();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found", {status: 404});

        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch prompt", {status: 500}); 
    }
}

// PATCH
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await dbConnect();
        const prevPrompt = await Prompt.findById(params.id);
        if(!prevPrompt) return new Response("Prompt not found", {status: 404});

        prevPrompt.prompt = prompt;
        prevPrompt.tag = tag;

        await prevPrompt.save();
        return new Response(JSON.stringify(prevPrompt), {status: 200});
    } catch (error) {
        return new Response("Failed to update prompt", {status: 500}); 
    }
}


// DELETE
export const DELETE = async (req, { params }) => {
    try {
        await dbConnect();
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", {status: 200});
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500}); 
    }
}