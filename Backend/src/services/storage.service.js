import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const imagekit = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile({buffer, fileName, folder = "fleet"}) {
    const result = await imagekit.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    })
    
    return result;
}
