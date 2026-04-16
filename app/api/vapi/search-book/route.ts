// import { searchBookSegments } from "@/lib/actions/book.action";
// import { NextResponse } from "next/server";

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     const body = await request.json();

//     const toolCallResults: { toolCallId: string; result: string }[] = [];

//     const toolCalls: { id: string; function: { name: string; parameters: Record<string, string> } }[] =
//       body?.message?.toolCalls ?? [];

//     for (const toolCall of toolCalls) {
//       if (toolCall.function?.name !== "searchBook") continue;

//       const { bookId, query } = toolCall.function.parameters ?? {};

//       let result: string;

//       if (!bookId || !query) {
//         result = "No information found about this topic.";
//       } else {
//         const { success, data } = await searchBookSegments(bookId, query, 3);

//         if (!success || !data || data.length === 0) {
//           result = "No information found about this topic.";
//         } else {
//           result = (data as { content: string }[])
//             .map((seg) => seg.content)
//             .join("\n\n");
//         }
//       }

//       toolCallResults.push({ toolCallId: toolCall.id, result });
//     }

//     return NextResponse.json({ results: toolCallResults });
//   } catch (e) {
//     const message = e instanceof Error ? e.message : "An unknown error occurred";
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';

import { searchBookSegments } from '@/lib/actions/book.action     ';

// Helper function to process book search logic
async function processBookSearch(bookId: unknown, query: unknown) {
    // Validate inputs before conversion to prevent null/undefined becoming "null"/"undefined" strings
    if (bookId == null || query == null || query === '') {
        return { result: 'Missing bookId or query' };
    }

    // Convert bookId to string
    const bookIdStr = String(bookId);
    const queryStr = String(query).trim();

    // Additional validation after conversion
    if (!bookIdStr || bookIdStr === 'null' || bookIdStr === 'undefined' || !queryStr) {
        return { result: 'Missing bookId or query' };
    }

    // Execute search
    const searchResult = await searchBookSegments(bookIdStr, queryStr, 3);

    // Return results
    if (!searchResult.success || !searchResult.data?.length) {
        return { result: 'No information found about this topic in the book.' };
    }

    const combinedText = searchResult.data
        .map((segment) => (segment as { content: string }).content)
        .join('\n\n');

    return { result: combinedText };
}

export async function GET() {
    return NextResponse.json({ status: 'ok' });
}

// Parse tool arguments that may arrive as a JSON string or an object
function parseArgs(args: unknown): Record<string, unknown> {
    if (!args) return {};
    if (typeof args === 'string') {
        try { return JSON.parse(args); } catch { return {}; }
    }
    return args as Record<string, unknown>;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log('Vapi search-book request:', JSON.stringify(body, null, 2));

        // Support multiple Vapi formats
        const functionCall = body?.message?.functionCall;
        const toolCallList = body?.message?.toolCallList || body?.message?.toolCalls;

        // Handle single functionCall format
        if (functionCall) {
            const { name, parameters } = functionCall;
            const parsed = parseArgs(parameters);

            if (name === 'searchBook') {
                const result = await processBookSearch(parsed.bookId, parsed.query);
                return NextResponse.json(result);
            }

            return NextResponse.json({ result: `Unknown function: ${name}` });
        }

        // Handle toolCallList format (array of calls)
        if (!toolCallList || toolCallList.length === 0) {
            return NextResponse.json({
                results: [{ result: 'No tool calls found' }],
            });
        }

        const results = [];

        for (const toolCall of toolCallList) {
            const { id, function: func } = toolCall;
            const name = func?.name;
            const args = parseArgs(func?.arguments);

            if (name === 'searchBook') {
                const searchResult = await processBookSearch(args.bookId, args.query);
                results.push({ toolCallId: id, ...searchResult });
            } else {
                results.push({ toolCallId: id, result: `Unknown function: ${name}` });
            }
        }

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Vapi search-book error:', error);
        return NextResponse.json({
            results: [{ result: 'Error processing request' }],
        });
    }
}