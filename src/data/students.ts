import { Student } from '../types';

export const EXCLUDED_NUMBERS = new Set([3, 7, 15, 16, 17, 25, 34, 36]);

export function generateDefaultStudents(): Student[] {
  const students: Student[] = [];
  for (let id = 1; id <= 36; id++) {
    if (EXCLUDED_NUMBERS.has(id)) continue;
    const numberStr = id < 10 ? `0${id}` : `${id}`;
    students.push({
      id,
      numberStr,
      name: `Siswa ${numberStr}`,
    });
  }
  return students;
}

