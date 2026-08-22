export declare class CreateCurriculumRuleDto {
    academicYearId: string;
    grade?: number;
    classId?: string;
    subjectId: string;
    requiredPeriodsPerWeek: number;
    minPeriodsPerDay?: number;
    maxPeriodsPerDay?: number;
    isRequired?: boolean;
    severity?: string;
}
