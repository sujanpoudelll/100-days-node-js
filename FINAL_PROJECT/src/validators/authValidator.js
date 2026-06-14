const {z} = require('zod');


const registerSchema = z.object({
    name: z.string({
        error: "Name is required"
    }).min(3,"Name must be atleast 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
});

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1,"Enter your password"),

});

module.exports = {registerSchema,loginSchema};

