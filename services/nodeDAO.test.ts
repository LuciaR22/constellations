import { InMemoryNodeDAO } from "./nodeDAO";

describe("InMemoryNodeDAO", () => {
    it("creates, reads, updates, and deletes a node successfully", async () => {
        const dao = new InMemoryNodeDAO();

        const created = await dao.create({
            title: "Arrival",
            type: "movie",
            tags: ["sci-fi", "reflection"],
            notes: "A thoughtful sci-fi story.",
            createdAt: new Date("2024-01-15T00:00:00.000Z"),
        });

        expect(created.id).toEqual(expect.any(String));
        expect(created.title).toBe("Arrival");
        expect(created.type).toBe("movie");
        expect(created.tags).toEqual(["sci-fi", "reflection"]);

        const fetched = await dao.getById(created.id);
        expect(fetched).toEqual(created);

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

        await expect(dao.delete(created.id)).resolves.toBeUndefined();
        await expect(dao.getById(created.id)).resolves.toBeUndefined();
    });

    it("fails to create a node when the title is empty", async () => {
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

    it("fails to update a node when a required field becomes empty", async () => {
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

    it("fails to delete a missing node with a clear error message", async () => {
        const dao = new InMemoryNodeDAO();

        await expect(dao.delete("missing-node")).rejects.toThrow("Node with id missing-node was not found.");
    });
});
