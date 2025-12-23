// scripts/update-types.ts
import { createServer } from "vite";

(async () => {
    const server = await createServer({
        configFile: "./vite.config.ts", // Pastikan path ini benar
        mode: "development",
    });

    // Memulai server sebentar untuk memicu plugin
    await server.listen();

    // Matikan server segera setelah plugin berjalan
    await server.close();

    console.log("✅ Prepared!");
    process.exit(0);
})();
