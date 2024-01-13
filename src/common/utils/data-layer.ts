import * as fs from "fs";

export class DataLayer {
    static readData<T>(filePath: string): T {
        try {
            if(!fs.existsSync(filePath)){
                return [] as T;
            }
            return JSON.parse(fs.readFileSync(filePath, 'utf8')) || {};
        }
        catch (error) {
            return {} as T;
        }
    }

    static writeData(filePath: string, data: any): void {
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    }
}