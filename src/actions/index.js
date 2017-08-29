
export const ORDER_BY = 'ORDER_BY'

export function orderBy(value) {
  return {
    type: ORDER_BY,
    orderSelected: value
  }
}



