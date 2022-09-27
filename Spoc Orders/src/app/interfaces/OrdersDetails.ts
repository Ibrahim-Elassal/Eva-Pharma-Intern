export interface IOrderDetails {
  "id": number,
  "pharmacyName": string ,
  "distributorName": string,
  "agentName": string,
  "orderDate": string,
  "branchName": string,
  "pharmacyCode": string,
  "expiryGoods": boolean,
  "valueOfExpiredGoods": string,
  "products": [
      {
          "name": string,
          "quantity": number,
          "expiryDate": string
      }
  ],
  "managerName": string
}