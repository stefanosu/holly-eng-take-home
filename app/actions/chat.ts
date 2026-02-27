"use server";

import Anthropic from "@anthropic-ai/sdk";
import { loadJobListings } from "../../lib/dataLoader";
import { findMatchingJob } from "../../lib/matcher";

const client = new Anthropic();

export async function chat(message: string): Promise<string> {
  const listings = loadJobListings();
  const match = findMatchingJob(message, listings);

  if (!match) {
    return "I couldn't find a job matching your query. Try including the job title and jurisdiction.";
  }

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are an HR assistant. Answer the following question using only the job data provided.
                Job Data:
${JSON.stringify(match, null, 2)}

Question: ${message}`,
      },
    ],
  });

  const block = response.content[0]
  return block.type === 'text' ? block.text : 'No response generated.'
}
