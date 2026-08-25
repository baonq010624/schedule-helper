'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { curriculumRuleAPI, masterDataAPI } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ReportRow {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  required: number | null;
  actual: number;
  status: string;
  severity: string;
}

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'ĐẠT': 'default',
  'THIẾU': 'destructive',
  'THỪA': 'secondary',
  'KHÔNG CÓ QUY ĐỊNH': 'outline',
};

export default function ReportsPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [report, setReport] = useState<{ className: string; grade: number; subjects: ReportRow[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    masterDataAPI.getClasses().then((res) => {
      setClasses(res.data);
      if (res.data.length > 0) setSelectedClassId(res.data[0]._id);
    });
  }, []);

  useEffect(() => {
    if (selectedClassId) loadReport();
  }, [selectedClassId]);

  const loadReport = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await curriculumRuleAPI.getClassReport(selectedClassId);
      setReport(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tải báo cáo');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">Báo Cáo Số Tiết</h1>
            <p className="text-sm text-muted-foreground">
              So sánh số tiết đã xếp với quy định chương trình cho từng lớp
            </p>
          </div>
          <div className="w-56 space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Chọn Lớp</label>
            <Select value={selectedClassId} onValueChange={(value) => setSelectedClassId(value ?? '')}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn lớp" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.name} (Khối {c.grade})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="overflow-hidden py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Môn Học</TableHead>
                <TableHead className="text-center">Yêu Cầu</TableHead>
                <TableHead className="text-center">Đã Xếp</TableHead>
                <TableHead className="text-center">Trạng Thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : !report || report.subjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    Chưa có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                report.subjects.map((row) => (
                  <TableRow key={row.subjectId}>
                    <TableCell className="font-medium">{row.subjectName}</TableCell>
                    <TableCell className="text-center">{row.required ?? '-'}</TableCell>
                    <TableCell className="text-center">{row.actual}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={STATUS_VARIANT[row.status] ?? 'outline'}>{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </ProtectedLayout>
  );
}

