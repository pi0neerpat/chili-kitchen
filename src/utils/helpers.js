export const truncateAddress = (address) =>
  address.substring(0, 6) + `...` + address.substring(37, 42)
