import { InMemoryNodeDAO } from "./nodeDAO";

describe("InMemoryNodeDAO create", () => {
    it("creates a node with valid data", async () => {
        const dao = new InMemoryNodeDAO();

        const created = await dao.create({
            title: "Arrival",
            type: "movie",
            tags: ["sci-fi", "reflection"],
            notes: "A thoughtful sci-fi story.",
            createdAt: new Date("2024-01-15T00:00:00.000Z"),
        });

        expect(created).toMatchObject({
            id: expect.any(String),
            title: "Arrival",
            type: "movie",
            tags: ["sci-fi", "reflection"],
            notes: "A thoughtful sci-fi story.",
        });
        expect(created.createdAt).toEqual(new Date("2024-01-15T00:00:00.000Z"));
    });

    it("throws when the title is empty", async () => {
        const dao = new InMemoryNodeDAO();

        await expect(
            dao.create({
                title: "",
                type: "book",
                tags: ["fiction"],
                createdAt: new Date("2024-01-15T00:00:00.000Z"),
            }),
        ).rejects.toThrow("Node could not be saved because the title field is empty.");
    });
});

describe("InMemoryNodeDAO reads", () => {
    it("reads a node by id", async () => {
        const dao = new InMemoryNodeDAO();

        const created = await dao.create({
            title: "Moon",
            type: "movie",
            tags: ["space"],
            notes: "A cosmic journey.",
            createdAt: new Date("2024-01-15T00:00:00.000Z"),
        });

        const fetched = await dao.getById(created.id);
        expect(fetched).toEqual(created);
    });

    it("lists all nodes", async () => {
        const dao = new InMemoryNodeDAO();

        const created = await dao.create({
            title: "Moon",
            type: "movie",
            tags: ["space"],
            notes: "A cosmic journey.",
            createdAt: new Date("2024-01-15T00:00:00.000Z"),
        });

        await expect(dao.list()).resolves.toEqual([created]);
    });

    it("returns undefined for a missing id", async () => {
        const dao = new InMemoryNodeDAO();

        await expect(dao.getById("missing-node")).resolves.toBeUndefined();
    });
});

describe("InMemoryNodeDAO updates", () => {
    it("updates an existing node with valid partial data", async () => {
        const dao = new InMemoryNodeDAO();

        const created = await dao.create({
            title: "Arrival",
            type: "movie",
            tags: ["sci-fi", "reflection"],
            notes: "A thoughtful sci-fi story.",
            createdAt: new Date("2024-01-15T00:00:00.000Z"),
        });

        const updated = await dao.update(created.id, {
            title: "Arrival (Revisited)",
            notes: "Updated note.",
        });

        expect(updated).toMatchObject({
            id: created.id,
            title: "Arrival (Revisited)",
            type: "movie",
            tags: ["sci-fi", "reflection"],
            notes: "Updated note.",
        });
    });

    it("throws when a required field becomes empty during update", async () => {
        const dao = new InMemoryNodeDAO();

        const created = await dao.create({
            title: "Moon",
            type: "movie",
            tags: ["space"],
            createdAt: new Date("2024-01-15T00:00:00.000Z"),
        });

        await expect(
            dao.update(created.id, {
                title: "",
            }),
        ).rejects.toThrow("Node could not be updated because title is empty.");
    });
});

describe("InMemoryNodeDAO deletes", () => {
    it("deletes an existing node", async () => {
        const dao = new InMemoryNodeDAO();

        const created = await dao.create({
            title: "Blade Runner",
            type: "movie",
            tags: ["cyberpunk"],
            createdAt: new Date("2024-01-15T00:00:00.000Z"),
        });

        await expect(dao.delete(created.id)).resolves.toBeUndefined();
        await expect(dao.getById(created.id)).resolves.toBeUndefined();
    });

    it("throws when deleting a missing node", async () => {
        const dao = new InMemoryNodeDAO();

        await expect(dao.delete("missing-node")).rejects.toThrow("Node with id missing-node was not found.");
    });
});
