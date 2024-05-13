
const app = require("./app"); 
const { PORT } = process.env;

const startApp = async () => {
    try {
        await app.listen(PORT, () => {
            console.log(`Backend running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startApp();
