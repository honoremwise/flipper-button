import { CustomerTypePrices } from '../../customerType/api/CustomerTypePrices';
import { CustomerType } from '../../customerType/api/CustomerType';
import { TAXRATE } from '../../tax-rates/api/tax-rate';
import { Category } from '../../categories/api/category';
import { Item } from '../../../pos/api/item';



export class Stock {
  id?: number;
  stock_transctions: [{ id: number, stock_id: number, quantity: number,batch_no?:string, unit_price?:any;currency?:string;type: string, transaction: string, comments: string, transction_date: string, branch_id: number, created_at: string, updated_at: string,reason_id?:number;reason?:any }];
  customer_type_items?:CustomerTypePrices[]=[];
  customer_price?:CustomerTypePrices;
  customer_type?:CustomerType;
  created_at: string;
  updated_at: string;
  minimum_stock_counts: number;
  expired_date: string;
  item: Item;
  tax_rate?:TAXRATE;
  name?: string;
  sku?: string;
  price: number;
  category_id?: number;
  category?: Category;
  qty?: string;
  sale_price?: string;
  stock_id?: number;
  currency?: string;
  status?: any;
  available_stock_qty?: number;
  in_stock_qty?: number;
  weight?: number;
  unit_of_measure?: string;
  item_id?: number;
  branch_id?: number;
  branch?: any;
  unit_of_sale?:number;
  item_entries: {};
  item_soldout: {};
  min_stock?:number;
  max_stock?:number;
  on_order?: number;
  show_alert?: boolean;
  unit_of_sal?: string;
  unit_of_volume?: string;
  available: any[] | Stock[];
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
export class StockMovements {
  id?: number;
   stock_id?: number;
   quantity?: number;
   batch_no?:string;
    type: string;
    transaction: string;
    comments: string;
      branch_id: number;
       created_at: string;
        updated_at: string;
        reason_id?:number;
        reason?:any;
        transction_date?:Date;
        manufacture_date?:Date;
        expired_date?:Date;
        in_qty?:number;
        out_qty?:number;
        total_qty?:number;
        item?:Object={};
   constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
  }

