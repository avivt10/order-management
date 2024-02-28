export interface OrderInterface{
  branch_id: number,
  created_at: string,
  customer_id: number,
  date: string,
  event_id: number,
  id: number,
  notes: string,
  num_of_guests: number,
  order_type: string,
  prediction: boolean
  recurrence: number,
  status: string,
  time: string,
  updated_at: string,
  customer: string,
  source: string,
  branch: string,
}
export interface OrdersInterface{
  orders: OrderInterface[];
}