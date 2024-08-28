import { IssueValues } from "@validators/issue.shema";
import { NextApiResponse } from "next";

export async function POST(req: Request) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.REPO_OWNER;
    const REPO_NAME = process.env.REPO_NAME;
    let data: IssueValues = await req.json();

    if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
        return new Response(JSON.stringify({ error: 'Missing environment variables' }), { status: 500 });
    }

    data = {
        ...data,
        labels: [...(data.labels || []), "bug"],
    };

    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return new Response(JSON.stringify({ message: 'Issue créée avec succès' }), { status: 200 });
        } else {
            const errorData = await response.json();
            return new Response(JSON.stringify(errorData), { status: response.status });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Échec de la création de l\'issue' }), { status: 500 });
    }
}
