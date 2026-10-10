import {
  RegistrationFormData,
  CustomerTrackingRecord,
  SurveySubmission,
  UserAccount,
  MonthlyBillRecord,
} from '../types';
import {
  fetchRegistrationsFromDb,
  saveRegistrationToDb,
  deleteRegistrationFromDb,
  fetchTrackingRecordsFromDb,
  saveTrackingRecordToDb,
  fetchSurveysFromDb,
  saveSurveyToDb,
  fetchMonthlyBillsFromDb,
  saveMonthlyBillToDb,
  deleteMonthlyBillFromDb,
  fetchUserAccountsFromDb,
  saveUserAccountToDb,
} from './supabaseService';

export interface CloudSyncPayload {
  version: number;
  lastSync: string;
  accounts: UserAccount[];
  registrations: RegistrationFormData[];
  trackingRecords: CustomerTrackingRecord[];
  bills: MonthlyBillRecord[];
  surveys: SurveySubmission[];
}

export const INITIAL_BILLS_DATA: MonthlyBillRecord[] = [];

class CloudSyncService {
  private listeners: Array<() => void> = [];
  private cache: CloudSyncPayload = {
    version: 1,
    lastSync: new Date().toISOString(),
    accounts: [],
    registrations: [],
    trackingRecords: [],
    bills: [],
    surveys: [],
  };

  public addListener(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => {
      try {
        l();
      } catch (err) {
        console.warn('Listener error in CloudSyncService:', err);
      }
    });
  }

  public getLocalSnapshot(): CloudSyncPayload {
    return this.cache;
  }

  public setCache(partial: Partial<CloudSyncPayload>) {
    this.cache = { ...this.cache, ...partial, lastSync: new Date().toISOString() };
    this.notify();
  }

  // Pull latest data directly from Supabase (Source of Truth)
  public async pullFromCloud(): Promise<CloudSyncPayload | null> {
    try {
      const [regs, trackings, bills, surveys, accounts] = await Promise.all([
        fetchRegistrationsFromDb(),
        fetchTrackingRecordsFromDb(),
        fetchMonthlyBillsFromDb(),
        fetchSurveysFromDb(),
        fetchUserAccountsFromDb(),
      ]);

      if (regs !== null) this.cache.registrations = regs;
      if (trackings !== null) this.cache.trackingRecords = trackings;
      if (bills !== null) this.cache.bills = bills;
      if (surveys !== null) this.cache.surveys = surveys;
      if (accounts !== null) this.cache.accounts = accounts;

      this.cache.lastSync = new Date().toISOString();
      this.notify();
      return this.cache;
    } catch (err) {
      console.error('Error fetching data from Supabase in CloudSyncService:', err);
      return null;
    }
  }

  public async saveRegistration(reg: RegistrationFormData) {
    this.cache.registrations = [reg, ...this.cache.registrations.filter((r) => r.noForm !== reg.noForm)];
    this.notify();
    await saveRegistrationToDb(reg);
  }

  public async deleteRegistration(noForm: string) {
    this.cache.registrations = this.cache.registrations.filter((r) => r.noForm !== noForm);
    this.cache.trackingRecords = this.cache.trackingRecords.filter((t) => t.noForm !== noForm);
    this.notify();
    await deleteRegistrationFromDb(noForm);
  }

  public async saveTracking(track: CustomerTrackingRecord) {
    this.cache.trackingRecords = [track, ...this.cache.trackingRecords.filter((t) => t.noForm !== track.noForm)];
    this.notify();
    await saveTrackingRecordToDb(track);
  }

  public async saveBills(bills: MonthlyBillRecord[]) {
    this.cache.bills = bills;
    this.notify();
    for (const b of bills) {
      await saveMonthlyBillToDb(b);
    }
  }

  public async deleteBill(id: string) {
    this.cache.bills = this.cache.bills.filter((b) => b.id !== id);
    this.notify();
    await deleteMonthlyBillFromDb(id);
  }

  public async saveSurvey(survey: SurveySubmission) {
    this.cache.surveys = [survey, ...this.cache.surveys.filter((s) => s.id !== survey.id)];
    this.notify();
    await saveSurveyToDb(survey);
  }

  public async saveAccount(account: UserAccount) {
    this.cache.accounts = [account, ...this.cache.accounts.filter((a) => a.id !== account.id && a.email !== account.email)];
    this.notify();
    await saveUserAccountToDb(account);
  }

  public async syncNow() {
    return this.pullFromCloud();
  }
}

export const cloudSyncService = new CloudSyncService();
