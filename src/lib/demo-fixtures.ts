/**
 * PREVIEW-ONLY sample business ("Sample Studio Co.") for the demo build.
 * Made-up numbers chosen so every total can be checked by hand:
 *
 *   Month      Income   Expenses  Net    Cash (balance)
 *   Apr 2025   20,000   16,000    4,000  30,000   same month last year
 *   Dec 2025   24,000   19,000    5,000  38,000   prior year, must not count in 2026
 *   Jan 2026   (not saved)
 *   Feb 2026   22,000   18,000    4,000  41,000
 *   Mar 2026   23,500   18,500    5,000  42,500
 *   Apr 2026   25,000   21,000    4,000  44,000   latest save for April (spreadsheet)
 *   Apr 2026   23,000   20,000    3,000  43,000   older manual save, superseded
 *   Jun 2027   99,999   99,999        0  99,999   future-dated, must be ignored
 *
 * January–April 2026: income 70,500, expenses 57,500, net 13,000 (18.4%),
 * cash 44,000 as of April (balances are never added up). Recent average
 * (Feb–Apr): income 23,500, expenses 19,166.67.
 */

const USER_ID = "00000000-0000-4000-8000-0000000000de";

type Row = Record<string, unknown>;

function snapshot(
  period_date: string,
  created_at: string,
  data_source: string,
  income: number,
  expenses: number,
  cash: number,
  extra: Row = {}
): Row {
  return {
    id: `sample-${period_date}-${data_source}`,
    user_id: USER_ID,
    period_date,
    data_source,
    total_income: income,
    gross_profit: null,
    total_expenses: expenses,
    net_operating_income: null,
    net_profit: income - expenses,
    gross_profit_margin: null,
    net_profit_margin: income > 0 ? (income - expenses) / income : null,
    current_assets: cash,
    fixed_assets: null,
    total_assets: null,
    current_liabilities: 6000,
    long_term_liabilities: null,
    equity: null,
    operating_activities: null,
    investing_activities: null,
    financing_activities: null,
    net_cash_flow: null,
    current_ratio: null,
    working_capital: null,
    roa: null,
    roe: null,
    pl_detail: null,
    bs_detail: null,
    cf_detail: null,
    prior_month_date: null,
    accounts_receivable: 3000,
    inventory_value: null,
    ytd_revenue: null,
    ytd_expenses: null,
    expense_breakdown: null,
    created_at,
    ...extra,
  };
}

export const SAMPLE_SNAPSHOTS: Row[] = [
  snapshot("2025-04-30", "2025-05-05T15:00:00Z", "spreadsheet", 20000, 16000, 30000, { net_cash_flow: 1500, operating_activities: 2500, investing_activities: -1000, financing_activities: 0 }),
  snapshot("2025-12-31", "2026-01-06T15:00:00Z", "spreadsheet", 24000, 19000, 38000, { net_cash_flow: 2000, operating_activities: 2000, investing_activities: 0, financing_activities: 0 }),
  snapshot("2026-02-28", "2026-05-04T15:00:00Z", "spreadsheet", 22000, 18000, 41000, { net_cash_flow: 3000, operating_activities: 3500, investing_activities: -500, financing_activities: 0 }),
  snapshot("2026-03-31", "2026-05-04T15:00:00Z", "spreadsheet", 23500, 18500, 42500, { net_cash_flow: 1500, operating_activities: 2000, investing_activities: -500, financing_activities: 0 }),
  snapshot("2026-04-01", "2026-04-20T15:00:00Z", "manual", 23000, 20000, 43000),
  snapshot("2026-04-30", "2026-05-04T15:00:00Z", "spreadsheet", 25000, 21000, 44000, { net_cash_flow: 1500, operating_activities: 2500, investing_activities: -1000, financing_activities: 0 }),
  snapshot("2027-06-30", "2026-05-04T15:00:00Z", "spreadsheet", 99999, 99999, 99999),
];

export const SAMPLE_ASSESSMENT: Row = {
  id: "sample-assessment",
  user_id: USER_ID,
  cash_on_hand: 44000,
  monthly_revenue: 25000,
  monthly_expenses: 21000,
  accounts_receivable: 3000,
  employee_count: 4,
  biggest_worry: null,
  health_score: 0,
  ai_summary: null,
  recommendations: null,
  created_at: "2026-05-04T15:00:00Z",
};

export function sampleActiveSubscription(): Row {
  return {
    id: "demo-subscription",
    user_id: USER_ID,
    plan: "pro",
    subscription_status: "active",
    billing_interval: "monthly",
    current_period_end: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    comp_days: 0,
  };
}
