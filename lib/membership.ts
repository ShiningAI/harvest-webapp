import dayjs from "dayjs";

/**
 * 会员信息类型
 */
export interface MembershipInfo {
  id: number;
  startDate: string;
  endDate: string;
  nextBillingDate: string;
}

/**
 * 判断会员是否有效（未过期）
 * @param harvest 会员信息
 * @returns true 表示会员有效且未过期，false 表示已过期或无会员信息
 */
export function isMemberActive(harvest: MembershipInfo | null | undefined): boolean {
  if (!harvest?.endDate) {
    return false;
  }
  return dayjs(harvest.endDate).isAfter(dayjs());
}

/**
 * 判断用户是否曾经购买过会员
 * @param harvest 会员信息
 * @returns true 表示曾经购买过会员（无论是否过期）
 */
export function hasPurchasedMembership(harvest: MembershipInfo | null | undefined): boolean {
  return !!harvest?.id;
}

