const { z } = require("zod");


const AuthorSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(25, { message: "Name cannot exceed 25 characters" }),

    biography: z
        .string({ required_error: "Biography is required" })
        .trim()
        .min(5, { message: "Biography must be at least 5 characters" })
        .max(50, { message: "Biography cannot exceed 50 characters" }),

    dateOfBirth: z.date().optional(),

    nationality: z
        .string({ required_error: "Nationality is required" })
        .trim()
        .min(3, { message: "Nationality must be at least 3 characters" })
        .max(30, { message: "Nationality cannot exceed 30 characters" }),

    books: z.array(z.string().length(24, "Invalid ObjectId format")).optional(),
});

module.exports = { AuthorSchema };
