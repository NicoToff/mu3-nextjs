// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma-client";

export type TagVisibilityResponse = {
    updatedValue: number | null | undefined;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<TagVisibilityResponse>) {
    const { tagName, isVisible } = req.body as { tagName: string; isVisible: number };
    try {
        const updatedTag = await prisma.tag.update({
            where: { name: tagName },
            data: { isVisible },
        });
        res.status(200).json({ updatedValue: updatedTag.isVisible });
    } catch (error) {
        console.error(error);
        res.status(500).json({ updatedValue: undefined });
    }
}
