/** @format */

export type DonutItem = {
  name: string;
  value: number;
};

export type BarItem = {
  name: string;
  value: number;
};

export type User = {
  firstName: string;
  lastName: string;
  username: string;
};

export type DashboardResponse = {
  success: boolean;
  chartDonut: DonutItem[];
  chartBar: BarItem[];
  tableUsers: User[];
};
