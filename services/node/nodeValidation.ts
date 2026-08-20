import type { CreateNodeInput } from "./node";

export function generateNodeId(): string {
    return `node_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.trim().length > 0;
}

export function validateTags(tags: string[] | undefined, operation: "saved" | "updated"): string[] {
    if (!Array.isArray(tags) || tags.length === 0) {
        throw new Error(`Node could not be ${operation} because tags is empty.`);
    }

    const normalizedTags = tags.map(tag => tag.trim());

    if (normalizedTags.some(tag => tag.length === 0)) {
        throw new Error(`Node could not be ${operation} because tags contains an empty value.`);
    }

    return normalizedTags;
}

export function validateNodeInput(input: CreateNodeInput, operation: "saved" | "updated"): void {
    if (!isNonEmptyString(input.title)) {
        if (operation === "saved") {
            throw new Error("Node could not be saved because the title field is empty.");
        }

        throw new Error("Node could not be updated because title is empty.");
    }

    if (!isNonEmptyString(input.type)) {
        throw new Error(`Node could not be ${operation} because type is empty.`);
    }

    if (!(input.createdAt instanceof Date) || Number.isNaN(input.createdAt.getTime())) {
        throw new Error(`Node could not be ${operation} because createdAt is empty.`);
    }

    validateTags(input.tags, operation);
}
