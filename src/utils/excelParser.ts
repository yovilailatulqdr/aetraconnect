import * as XLSX from 'xlsx';
import { ColumnProfile, ColumnType, SheetData, WorkbookData } from '../types/excel';

export function parseExcelFile(fileData: ArrayBuffer, fileName: string, fileSize: number): WorkbookData {
  const workbook = XLSX.read(fileData, {
    type: 'array',
    cellDates: true,
    cellNF: false,
    cellText: false,
  });

  const sheetNames = workbook.SheetNames;
  const sheets: Record<string, SheetData> = {};

  for (const sheetName of sheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    // Convert to JSON objects
    const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
      defval: null,
      raw: false,
      dateNF: 'yyyy-mm-dd',
    });

    if (rawRows.length === 0) {
      sheets[sheetName] = {
        sheetName,
        headers: [],
        rows: [],
        totalRows: 0,
        columnsProfile: {},
        numericColumns: [],
        dateColumns: [],
        categoryColumns: [],
      };
      continue;
    }

    const headers = Object.keys(rawRows[0] || {});
    const sheetProfile = profileSheet(sheetName, headers, rawRows);
    sheets[sheetName] = sheetProfile;
  }

  return {
    fileName,
    fileSize,
    sheetNames,
    activeSheetName: sheetNames[0] || '',
    sheets,
    uploadedAt: new Date().toISOString(),
  };
}

export function parseCsvText(csvText: string, fileName = 'Pasted_Data.csv'): WorkbookData {
  const workbook = XLSX.read(csvText, {
    type: 'string',
    cellDates: true,
  });

  const sheetNames = workbook.SheetNames;
  const sheets: Record<string, SheetData> = {};

  for (const sheetName of sheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
      defval: null,
      raw: false,
    });

    const headers = rawRows.length > 0 ? Object.keys(rawRows[0]) : [];
    sheets[sheetName] = profileSheet(sheetName, headers, rawRows);
  }

  return {
    fileName,
    fileSize: new Blob([csvText]).size,
    sheetNames,
    activeSheetName: sheetNames[0] || '',
    sheets,
    uploadedAt: new Date().toISOString(),
  };
}

export function profileSheet(sheetName: string, headers: string[], rows: Record<string, any>[]): SheetData {
  const totalRows = rows.length;
  const columnsProfile: Record<string, ColumnProfile> = {};
  const numericColumns: string[] = [];
  const dateColumns: string[] = [];
  const categoryColumns: string[] = [];

  for (const col of headers) {
    let nullCount = 0;
    const values: any[] = [];
    const valueMap: Record<string, number> = {};

    let numericCandidates = 0;
    let dateCandidates = 0;
    let boolCandidates = 0;

    for (const row of rows) {
      const val = row[col];
      if (val === null || val === undefined || val === '') {
        nullCount++;
      } else {
        values.push(val);
        const strVal = String(val).trim();
        valueMap[strVal] = (valueMap[strVal] || 0) + 1;

        // Check if numeric
        const cleanNum = cleanNumericValue(val);
        if (cleanNum !== null && !isNaN(cleanNum)) {
          numericCandidates++;
        }

        // Check if date
        if (isDateValue(val)) {
          dateCandidates++;
        }

        if (strVal.toLowerCase() === 'true' || strVal.toLowerCase() === 'false' || strVal === '1' || strVal === '0') {
          boolCandidates++;
        }
      }
    }

    const nonNullCount = values.length;
    const uniqueCount = Object.keys(valueMap).length;
    const nullPercentage = totalRows > 0 ? Math.round((nullCount / totalRows) * 100) : 0;

    // Determine type
    let colType: ColumnType = 'text';

    if (nonNullCount > 0) {
      if (numericCandidates / nonNullCount >= 0.8) {
        colType = 'number';
      } else if (dateCandidates / nonNullCount >= 0.7) {
        colType = 'date';
      } else if (uniqueCount <= 30 && uniqueCount < nonNullCount) {
        colType = 'category';
      } else if (boolCandidates / nonNullCount >= 0.9 && uniqueCount <= 2) {
        colType = 'boolean';
      }
    }

    const isPotentialId = uniqueCount === nonNullCount && nonNullCount > 10;
    const isPotentialMeasure = colType === 'number' && !isPotentialId && !col.toLowerCase().includes('id');
    const isDateDimension = colType === 'date';
    const isPotentialDimension = (colType === 'category' || (colType === 'text' && uniqueCount <= 50)) && !isPotentialId;

    const profile: ColumnProfile = {
      name: col,
      type: colType,
      nullCount,
      nullPercentage,
      uniqueCount,
      isPotentialId,
      isPotentialDimension,
      isPotentialMeasure,
      isDateDimension,
    };

    if (colType === 'number') {
      numericColumns.push(col);
      const parsedNums = values
        .map(v => cleanNumericValue(v))
        .filter((n): n is number => n !== null && !isNaN(n));

      if (parsedNums.length > 0) {
        parsedNums.sort((a, b) => a - b);
        const sum = parsedNums.reduce((acc, val) => acc + val, 0);
        profile.min = parsedNums[0];
        profile.max = parsedNums[parsedNums.length - 1];
        profile.sum = sum;
        profile.avg = Math.round((sum / parsedNums.length) * 100) / 100;
        const mid = Math.floor(parsedNums.length / 2);
        profile.median = parsedNums.length % 2 !== 0 ? parsedNums[mid] : (parsedNums[mid - 1] + parsedNums[mid]) / 2;
      }
    } else if (colType === 'date') {
      dateColumns.push(col);
      const sortedDates = values.map(v => normalizeDate(v)).filter(Boolean).sort();
      if (sortedDates.length > 0) {
        profile.minDate = sortedDates[0];
        profile.maxDate = sortedDates[sortedDates.length - 1];
      }
    } else {
      if (isPotentialDimension) {
        categoryColumns.push(col);
      }
      // Top 5 frequency
      const sortedValues = Object.entries(valueMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([val, cnt]) => ({
          value: val,
          count: cnt,
          percentage: Math.round((cnt / nonNullCount) * 100),
        }));
      profile.topValues = sortedValues;
    }

    columnsProfile[col] = profile;
  }

  return {
    sheetName,
    headers,
    rows,
    totalRows,
    columnsProfile,
    numericColumns,
    dateColumns,
    categoryColumns,
  };
}

export function cleanNumericValue(val: any): number | null {
  if (typeof val === 'number') return isFinite(val) ? val : null;
  if (!val) return null;
  const str = String(val).trim();
  // Remove common currency symbols, spaces, commas
  // Handles $1,234.56 or Rp 1.234.567 or 1,234
  const cleaned = str
    .replace(/[Rp$€£¥\s%]/gi, '')
    .replace(/\.(?=\d{3})/g, '') // remove thousands dot
    .replace(/,(?=\d{3})/g, '') // remove thousands comma
    .replace(',', '.'); // convert decimal comma to dot

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

export function isDateValue(val: any): boolean {
  if (val instanceof Date && !isNaN(val.getTime())) return true;
  if (typeof val !== 'string') return false;
  const str = val.trim();
  if (str.length < 6 || str.length > 30) return false;
  // Regex for ISO, YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY
  if (/^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/.test(str)) return true;
  if (/^\d{1,2}[-/.]\d{1,2}[-/.]\d{4}/.test(str)) return true;
  const timestamp = Date.parse(str);
  return !isNaN(timestamp) && !/^\d+$/.test(str);
}

export function normalizeDate(val: any): string {
  if (val instanceof Date) {
    return val.toISOString().split('T')[0];
  }
  const str = String(val).trim();
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0];
  }
  return str;
}
