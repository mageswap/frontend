import { formatPrice, NumberType } from '@mageswap/conedison/format'
import { Price, Token } from '@mageswap/sdk-core'

import { Bound } from '../state/mint/v3/actions'

interface FormatTickPriceArgs {
  price: Price<Token, Token> | undefined
  atLimit: { [bound in Bound]?: boolean | undefined }
  direction: Bound
  placeholder?: string
  numberType?: NumberType
}

export function formatTickPrice({ price, atLimit, direction, placeholder, numberType }: FormatTickPriceArgs) {
  if (atLimit[direction]) {
    return direction === Bound.LOWER ? '0' : '∞'
  }

  if (!price && placeholder !== undefined) {
    return placeholder
  }

  return formatPrice(price, numberType ?? NumberType.TokenNonTx)
}
