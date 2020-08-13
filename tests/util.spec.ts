import { Expect, Test, TestCase } from 'alsatian';
import * as Util from '../src/util';

export class TestPluralizing {
  @Test('Words can be automatically pluralised')
  @TestCase('shark', 1, 'shark')
  @TestCase('shark', 2, 'sharks')
  public testAutoPlural(word: string, count: number, expected: string) {
    Expect(Util.plural(word, count)).toBe(expected);
  }

  @Test('Words can be manually pluralised')
  @TestCase('sheep', 1, 'sheep', 'sheep')
  @TestCase('sheep', 2, 'sheep', 'sheep')
  public testManualPlural(word: string, count: number, plural: string, expected: string) {
    Expect(Util.plural(word, count, plural)).toBe(expected);
  }
}

export class TestConvertingToDate {
  @Test('Can convert numbers to dates')
  @TestCase(1553560143, 2019)
  public testNumbers(n: number, expectedYear: number) {
    Expect(Util.toDate(n) instanceof Date).toBeTruthy();
    Expect((Util.toDate(n) as Date).getFullYear()).toBe(expectedYear);
  }

  @Test('Can convert string to dates')
  @TestCase('2019-03-26 10:30', 26)
  @TestCase('1920-03-26 10:30', 26)
  public testStrings(s: string, expectedDate: number) {
    Expect(Util.toDate(s) instanceof Date).toBeTruthy();
    Expect((Util.toDate(s) as Date).getDate()).toBe(expectedDate);
    Expect(Util.toDate('invalid date')).toBeNull();
  }
}

export class TestFormatDate {
  @Test('Can format a date with default options')
  @TestCase(new Date(2019, 2, 26, 10, 30), '26 Mar 2019, 10:30am')
  public testDefaults(date: Date, expectedOutput: string) {
    Expect(Util.formatDate(date)).toBe(expectedOutput);
  }

  @Test('Can format a date with includeDay option')
  @TestCase(new Date(2019, 2, 26, 10, 30), 'Tuesday, 26 Mar 2019, 10:30am')
  public testFormatWithDay(date: Date, expectedOutput: string) {
    Expect(Util.formatDate(date, { includeDay: true })).toBe(expectedOutput);
  }

  @Test('Can format a compact date with includeDay and compact option')
  @TestCase(new Date(2019, 2, 26, 10, 30), 'Tues, 26 Mar 2019, 10:30am')
  public testFormatWithDayCompact(date: Date, expectedOutput: string) {
    Expect(Util.formatDate(date, { includeDay: true, compact: true })).toBe(expectedOutput);
  }

  @Test('Can format a date with 24 hour option')
  @TestCase(new Date(2019, 2, 26, 10, 30), '26 Mar 2019, 10:30')
  @TestCase(new Date(2019, 2, 26, 12, 0), '26 Mar 2019, 12:00')
  @TestCase(new Date(2019, 2, 26, 18, 30), '26 Mar 2019, 18:30')
  @TestCase(new Date(2019, 2, 26, 0, 0), '26 Mar 2019, 0:00')
  public testFormatWith24Hours(date: Date, expectedOutput: string) {
    Expect(Util.formatDate(date, { twentyFourHour: true })).toBe(expectedOutput);
  }
}

export class TestSecondsBetweenDates {
  @Test('Can measure the time between two dates')
  @TestCase(new Date(2018, 2, 26, 10, 30), new Date(2018, 2, 26, 10, 0), -1800)
  @TestCase(new Date(2000, 2, 26, 10, 30), new Date(2200, 2, 26, 10, 30), 6311350800)
  @TestCase(new Date(2018, 2, 26, 10, 30), new Date(2018, 2, 26, 10, 30), 0)
  public testCompareWithNowWithDefaults(date: Date, otherDate: Date, expectedOutput: number) {
    Expect(Util.secondsBetweenDates(date, otherDate)).toBe(expectedOutput);
  }
}

export class TestDistanceOfTimeInWords {
  @Test('Can output relative times in words')
  @TestCase(10, '10 seconds')
  @TestCase(1000, '17 minutes')
  @TestCase(10 * 60 * 60, '10 hours')
  @TestCase(6 * 60 * 60 * 24, '6 days')
  @TestCase(14 * 60 * 60 * 24, '2 weeks')
  @TestCase(2 * 30 * 60 * 60 * 24, '2 months')
  @TestCase(100000000, '3 years')
  public testComparingDates(seconds: number, expectedOutput: string) {
    Expect(Util.distanceOfTimeInWords(seconds, false)).toBe(expectedOutput);
  }

  @Test('Respects the compact option')
  @TestCase(10, '10s')
  @TestCase(1000, '17m')
  @TestCase(10 * 60 * 60, '10h')
  @TestCase(6 * 60 * 60 * 24, '6d')
  @TestCase(14 * 60 * 60 * 24, '2w')
  @TestCase(2 * 30 * 60 * 60 * 24, '2mo')
  @TestCase(100000000, '3y')
  public testComparingDatesCompact(seconds: number, expectedOutput: string) {
    Expect(Util.distanceOfTimeInWords(seconds, false, true)).toBe(expectedOutput);
  }
}
