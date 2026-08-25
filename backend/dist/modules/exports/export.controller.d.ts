import type { Response } from 'express';
import { ExportService } from './export.service';
export declare class ExportController {
    private exportService;
    constructor(exportService: ExportService);
    private send;
    exportMaster(academicYearId: string | undefined, res: Response): Promise<void>;
    exportClass(classId: string, res: Response): Promise<void>;
    exportTeacher(teacherId: string, res: Response): Promise<void>;
    exportRoom(roomId: string, res: Response): Promise<void>;
}
