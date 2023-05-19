import { Trans } from '@lingui/macro'
import { InterfaceElementName } from '@mageswap/analytics-events'
import walletBannerPhoneImageSrc from 'assets/images/wallet_banner_phone_image.png'
import { ReactComponent as AppleLogo } from 'assets/svg/apple_logo.svg'
import { openDownloadApp, openWalletMicrosite } from 'components/AccountDrawer/DownloadButton'
import { BaseButton } from 'components/Button'
import { OpacityHoverState } from 'components/Common'
import Row from 'components/Row'
import { useScreenSize } from 'hooks/useScreenSize'
import { X } from 'react-feather'
import { useLocation } from 'react-router-dom'
import { useHideUniswapWalletBanner } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'
import { Z_INDEX } from 'theme/zIndex'
import { isIOS } from 'utils/userAgent'

const PopupContainer = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ show }) => !show && 'display: none'};

  background: url(${walletBannerPhoneImageSrc});
  background-repeat: no-repeat;
  background-position: top 18px right 15px;
  background-size: 166px;

  :hover {
    background-size: 170px;
  }
  transition: background-size ${({ theme }) => theme.transition.duration.medium}
    ${({ theme }) => theme.transition.timing.inOut};

  background-color: ${({ theme }) => theme.promotional};
  color: ${({ theme }) => theme.textPrimary};
  position: fixed;
  z-index: ${Z_INDEX.sticky};

  padding: 24px 16px 16px;

  border-radius: 20px;
  bottom: 20px;
  right: 20px;
  width: 390px;
  height: 164px;

  border: 1px solid ${({ theme }) => theme.backgroundOutline};

  box-shadow: ${({ theme }) => theme.deepShadow};

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    bottom: 62px;
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    width: unset;
    right: 10px;
    left: 10px;
  }

  user-select: none;
`

const ButtonRow = styled(Row)`
  gap: 16px;
`
const StyledXButton = styled(X)`
  cursor: pointer;
  position: absolute;
  top: 21px;
  right: 17px;

  color: ${({ theme }) => theme.white};
  ${OpacityHoverState};
`

const BannerButton = styled(BaseButton)`
  height: 40px;
  border-radius: 16px;
  padding: 10px;
  ${OpacityHoverState};
`

export default function UniswapWalletBanner() {
  const [hideUniswapWalletBanner, toggleHideUniswapWalletBanner] = useHideUniswapWalletBanner()
  const location = useLocation()
  const isLandingScreen = location.search === '?intro=true' || location.pathname === '/'

  const shouldDisplay = Boolean(!hideUniswapWalletBanner && !isLandingScreen)

  const screenSize = useScreenSize()
  return <></>
}
