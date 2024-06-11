import { dbConnect } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        await dbConnect();
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch (error) {
        return new Response("Failed to fetch prompts", {status: 500}); 
    }
}
