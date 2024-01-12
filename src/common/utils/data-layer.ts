import * as fs from "fs";

export class DataLayer {
    static readData(filePath: string) {
        try {
            if(!fs.existsSync(filePath)){
                return [];
            }
            return JSON.parse(fs.readFileSync(filePath, 'utf8')) || {};
        }
        catch (error) {
            return {};
        }
    }

    static writeData(filePath: string, data: any) {
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    }
}