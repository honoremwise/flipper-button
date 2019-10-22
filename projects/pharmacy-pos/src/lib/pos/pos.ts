import { Orders } from '../importables/orders/orders';
import { Customer } from '../importables/customers/customer';
import { Stock } from '../importables/stock/api/stock';
import { CustomerType } from '../importables/customerType/api/CustomerType';



export class Pos {
  id?: number;
  loading: boolean;
  currently_ordered?: Orders;
  choose_customer?: Customer;
  panel_content?: string;
  stocks?:Stock[]=[];
  orders?:Orders[]=[];

  customer_type_price?:CustomerType;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
export class Branch {
  name?: string;
  description?:string;
  id?: number;
  branch_id?: number;
  active?: number;
  business_id?: number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}


export class Business {
  name:string;
  type:string;
  address?:string;
  tin?:string;
  description?:string;
  id?:number;
  bussiness_id?: number;
  tax_charge?: any;
  currency_code?: any;
  currency_symbol?: any;
  web_url?: string;
  zip_code?: any;
  is_active?: boolean;
  created_at?:any;
  updated_at?:any;
  user_logged_in?: any;
  user_logged_role?: any;
  branchies?: any;
  users_belongs?: any;
  category?:string;
  phone?:string;
  email?:string;
  city?:string;
  country?:string;
  street1?:string;
  street2?:string;
  street3?:string;
  logo?:string;
  branches?:Branch[]
  receipt?:null;
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
  isSubmenu?:boolean
}
