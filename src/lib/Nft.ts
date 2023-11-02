export interface Nft {
  name: String
  token_address: String
  token_id: String | number
  metadata: String
  metaObject?: object
  imageUrl?: String
  chain_id?: String
}
