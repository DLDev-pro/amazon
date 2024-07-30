export const API_STATUS = {
  RE_LOGIN: 401,
  NOT_FOUND: 404,
}
export const CONFIG_TYPE = {
  ATTENDANCE: 1,
  ORDER_PROMOTION: 2,
  DAILY_TURN: 3,
  REFERRAL_APP: 4,
  REFERRAL_CODE: 5,
  REFERRAL_MEMBER: 6,
}

export const REQUEST_STATUS = {
  PENDING: 0,
  SUCCESS: 1,
  REFUSE: 2,
}
export const GENDER = {
  MALE: 0,
  FEMALE: 1,
}
export const REG_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

export const IS_ACTIVE = {
  ACTIVE: 1,
  INACTIVE: 0,
}

export const TRANSACTION_STATUS = {
  PENDING: 'Pending',
  SUCCESS: 'Success',
  REJECT: 'Reject',
}

export const TRANSACTION_TYPE = {
  TOPUP: 'TopUp',
  CASH_OUT: 'CashOut',
  PURCHASE_LEVEL: 'PurchaseLevel',
}

export const UserBankNames = {
  MartimeBank: 'MARITIME BANK',
  AgriBank: 'AGRIBANK',
  VietinBank: 'VIETINBANK',
  BacABank: 'BAC A BANK',
  BaoVietBank: 'BAO VIET BANK',
  BidvBank: 'BIDV BANK',
  GPBank: 'GP BANK',
  HDBank: 'HD BANK',
  HongLeOngBank: 'HONGLEONG BANK',
  IndovinaBank: 'INDOVINA BANK',
  KienLongBank: 'KIENLONGBANK',
  MBBank: 'MBBANK',
  NaMaBank: 'NAMA BANK',
  AChauBank: 'NGAN HANG A CHAU',
  TMCPDongABank: 'Ngân hàng TMCP Đông Á',
  TMCPVietABank: 'Ngân hàng TMCP Việt Á',
  LDVietNgaBank: 'NH LD VIET NGA',
  MTVCIMBBank: 'NH MTV CIMB',
  TMCPQuocDanBank: 'NH TMCP QUOC DAN',
  OceanBank: 'OCEANBANK',
  PGBBank: 'PGBANK',
  PhuongDongBank: 'PHUONGDONG BANK',
  SacomBank: 'SACOMBANK',
  SCBBank: 'SCB BANK',
  SeaBank: 'SEABANK',
  SHBBank: 'SHB BANK',
  ShinHanBank: 'SHINHAN BANK VN',
  TechcomBank: 'TECHCOMBANK',
  TienPhongBank: 'TIENPHONG BANK',
  UnitedOverseasBank: 'UNITED OVERSEAS BANK',
  VIBBank: 'VIB BANK',
  VIDPublicBank: 'VIDPublic Bank',
  VietBank: 'VIETBANK',
  VietcomBank: 'VIETCOMBANK',
  VPBank: 'VPBANK',
  WooriBank: '우리은행 (WOORI BANK)',
  LienVietPostBank: 'LienVietPostBank',
  EximBank: 'EXIMBANK',
  CitiBank: 'Citi Bank',
  BanVietBank: 'Ban Viet Bank',
  NCBBank: 'NCB Bank',
  SaigonBank: 'SAIGON Bank',
  KBKookminBank: 'KB국민은행 (KBKookminBank)',
  HSBCBank: 'HSBC Bank',
  OCBCBank: 'OCBC Bank',
  UOBBank: 'UOB Bank',
  MizuhoBank: 'Mizuho Bank',
  MUFGBank: 'MUFG Bank',
  DaeguBank: 'DGB대구은행 (DaeguBank)',
  MitsubishiUFJBank: 'Mitsubishi UFJ Bank',
  KEBHanaBank: 'KEB Hana Bank',
  KookminBank: 'Kookmin Bank',
  BusanBank: 'Busan Bank',
  USDTBEP20: 'USDT BEP20',
  CBBank: 'CB Bank',
  NonghyupBank: 'NH저축은행 (NonghyupBank)',
  KBKookmincard: 'KB국민카드 (KBKookmincard)',
  RakutenBank: '楽天銀行 (RakutenBank)',
  ShinkinBank: '全国の信用金庫 (ShinkinBank)',
  ResonaBank: 'りそな銀行 (ResonaBank)',
  Aozorabank: 'あおぞら銀行 (Aozorabank)',
  SMTB: '三井住友信託銀行 (SMTB)',
  AEONBank: 'イオン銀行 (AEONBank)',
  TaishinlnternationalBank: '台新銀行 (TaishinlnternationalBank)',
  taiwanBusinessBank: '台湾企銀 (taiwanBusinessBank)',
  OsakaShinkinBank: '北おおさか信用金庫 (OsakaShinkinBank)',
  DaichiMiraiShinkinBank: '大地みらい信用金庫 (DaichiMiraiShinkinBank)',
  SaitamakenShinkinbank: '奇玉縣信用金庫 (SaitamakenShinkinbank)',
  JoyoBank: '常陽銀行 (JoyoBank)',
  B77Bank: '七十七銀行 (77Bank)',
  PayPayBank: '旧ジャパンネット銀行 (PayPayBank)',
  AshikagaBank: '足利銀行 (AshikagaBank)',
  HekikaiShinkinBank: '碧海信用金庫 (HekikaiShinkinBank)',
  AmagasakiShinkinBank: '尼崎信用金庫 (AmagasakiShinkinBank)',
  TaiwanCooperativeBank: '台作金庫銀行 (TaiwanCooperativeBank)',
  NantoBank: '南都銀行 (NantoBank)',
  AujibunBank: 'Au じぶん銀行 (AujibunBank)',
  HirosimaBank: '広島銀行 (HirosimaBank)',
  bankoftaiwan: '臺灣銀行 (bankoftaiwan)',
  hokuribuBank: '北陸銀行 (hokuribuBank)',
  SMBC: '三井住友銀行 (SMBC)',
  NisshinShinkinBank: '日新信用金庫 (NisshinShinkinBank)',
  SevenBank: 'セブン銀行 (SevenBank)',
  GMOAozoraNetBank: 'あおぞらネツト銀行 (GMOAozoraNetBank)',
  ShinseiBank: '新生銀行 (ShinseiBank)',
  TaichungBank: '台中銀行 (TaichungBank)',
  nanyangCommercialBank: '南洋商业銀行 (nanyang commercial bank)',
  MegaInternationalCommercialBank:
    '兆豐國際商業銀行 (Mega International Commercial Bank)',
  firstbank: '第一銀行 (firstbank)',
  YuuchoGinkou: 'ゆうちょ銀行 (Yuucho Ginkou)',
  OgakiKyoritsuBank: '大垣共立銀行 (Ogaki Kyoritsu Bank)',
  cathayUnitedBankTaiwan: '国泰联合银行 (cathay united bank taiwan)',
  himawariShinkinBank: 'ひまわり信用金庫 (himawariShinkinBank)',
  LANDBANKOFTAIWAN: '臺灣土地銀行 (LAND BANK OF TAIWAN)',
  hyakugobank: '百万銀行 (hyakugobank)',
}

export enum IsBlockCreateOrder {
  Blocked = 0,
  NonBlocked,
}

// export const CHAT_LINK = 'https://direct.lc.chat/14744685/'
export const CHAT_LINK = 'https://jivo.chat/Wbtgk18ToA'
