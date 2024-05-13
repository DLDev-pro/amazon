import { ADMIN_ROUTER_PATH } from 'common/config'
import AboutUs from 'features/admin/aboutCatalog/AboutUs'
import BusinessSimulation from 'features/admin/aboutCatalog/BusinessSimulation'
import CompanyCulture from 'features/admin/aboutCatalog/CompanyCulture'
import DescMember from 'features/admin/aboutCatalog/DescMember'
import FinancialPrinciples from 'features/admin/aboutCatalog/FinancialPrinciples'
import PrivacyPolicy from 'features/admin/aboutCatalog/PrivacyPolicy'
import TeamDistribution from 'features/admin/aboutCatalog/TeamDistribution'
import Terms from 'features/admin/aboutCatalog/Term'
import { BankCardPage } from 'features/admin/bank_card'
import { ChangePassPage } from 'features/admin/change_pass'
import { DeliveryAddressPage } from 'features/admin/delivery_address'
import { DepositPassPage } from 'features/admin/deposit_pass'
import { HistoryPage } from 'features/admin/history'
import HistoryTransactionPage from 'features/admin/history/HistoryTransactionPage'
import { HomePage } from 'features/admin/home'
import Game from 'features/admin/home/Wheel'
import { MemberRankPage } from 'features/admin/member_rank'
import { MyGroupPage } from 'features/admin/my_group'
import { DetailOrder, OrderPage } from 'features/admin/order'
import BillOrder from 'features/admin/order/BillOrder'
import { PaymentPage } from 'features/admin/payment'
import { ProfilePage } from 'features/admin/profile'
import { RechargeMoneyPage } from 'features/admin/recharge_money'
import { SupportPage } from 'features/admin/support'
import { WithdrawMoneyPage } from 'features/admin/withdraw_money'
import React from 'react'

interface RouterProps {
  path: string
  component: React.FC | React.Component | any
  param?: any
  exact: boolean
}

const adminRouter: Array<RouterProps> = [
  {
    path: ADMIN_ROUTER_PATH.HOME,
    component: HomePage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.BANK_CARD,
    component: BankCardPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.DELIVERY_ADDRESS,
    component: DeliveryAddressPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.HISTORY,
    component: HistoryPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.MEMBER_RANK,
    component: MemberRankPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.MY_GROUP,
    component: MyGroupPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.ORDER,
    component: OrderPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.DETAIL_ORDER,
    component: DetailOrder,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.BILL,
    component: BillOrder,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.PROFILE,
    component: ProfilePage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.SUPPORT,
    component: SupportPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.WITHDRAW_MONEY,
    component: WithdrawMoneyPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.HISTORY_TRANSACTION,
    component: HistoryTransactionPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.RECHARGE_MONEY,
    component: RechargeMoneyPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.PAYMENT,
    component: PaymentPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.DEPOSIT_PASS,
    component: DepositPassPage,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.CHANGE_PASS,
    component: ChangePassPage,
    exact: true,
  },

  {
    path: ADMIN_ROUTER_PATH.ABOUT_US,
    component: AboutUs,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.DESCRIPTION_MEMBER,
    component: DescMember,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.FINANCIAL_PRINCIPLES,
    component: FinancialPrinciples,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.COMPANY_CULTURE,
    component: CompanyCulture,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.TERM,
    component: Terms,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.BUSINESS_SIMULATION,
    component: BusinessSimulation,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.TEAM_DISTRIBUTION,
    component: TeamDistribution,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.PRIVACY_POLICY,
    component: PrivacyPolicy,
    exact: true,
  },
  {
    path: ADMIN_ROUTER_PATH.WHEEL,
    component: Game,
    exact: true,
  },
]

export default adminRouter
