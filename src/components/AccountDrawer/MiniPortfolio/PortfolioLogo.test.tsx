import { SupportedChainId } from '@mageswap/sdk-core'
import { DAI_ARBITRUM } from '@mageswap/smart-order-router'
import { DAI, USDC_ARBITRUM, USDC_MAINNET } from 'constants/tokens'
import { render } from 'test-utils/render'

import { PortfolioLogo } from './PortfolioLogo'

describe('PortfolioLogo', () => {
  it('renders without L2 icon', () => {
    const { container } = render(<PortfolioLogo chainId={SupportedChainId.MAINNET} currencies={[DAI, USDC_MAINNET]} />)
    expect(container).toMatchSnapshot()
  })

  it('renders with L2 icon', () => {
    const { container } = render(
      <PortfolioLogo chainId={SupportedChainId.ARBITRUM_ONE} currencies={[DAI_ARBITRUM, USDC_ARBITRUM]} />
    )
    expect(container).toMatchSnapshot()
  })
})
